import logging
from datetime import date
from flask import Flask
from flask import jsonify
from fhirclient import client
from fhirclient.models.patient import Patient
from fhirclient.models.fhirsearch import FHIRSearchParam
from fhirclient.models.fhirabstractbase import FHIRValidationError
from requests.exceptions import HTTPError

# This is only used later in the query to the FHIR server as an example to the team
PEDIATRICS_AGE_LIMIT = (date.today() - (date(2000, 12, 31) - date(1980, 1, 1))).isoformat()

# Needed to initialize the FHIR Client later on
smart_defaults = {
    'app_id': 'pre_populated_intake_froms',
    'api_base': 'https://apps.hdap.gatech.edu/syntheticmass/baseDstu3'
}

# Flask app setup
app = Flask(__name__)

# Creates a FHIRClient object and returns it
def _get_smart():
    return client.FHIRClient(settings=smart_defaults)


@app.route("/api/hello")
def hello():
    return jsonify({"words": ["Hello ", "World ", "!"]})


# Example of a FHIR call that returns all the patients aged 21 and younger
@app.route('/api/patients')
def get_patients():
    """ Get all the patients
    """
    smart = _get_smart()

    search = Patient.where({'birthdate': f'ge{PEDIATRICS_AGE_LIMIT}'})
    params = [FHIRSearchParam("_count", "1"), FHIRSearchParam("_total", "accurate")]
    search.params.extend(params)
    try:
        results = []
        bundle = search.perform(smart.server)
        total = bundle.total
        print(f"Total={total}")
        p_search = Patient.where({'birthdate': f'ge{PEDIATRICS_AGE_LIMIT}'})
        p_params = [FHIRSearchParam("_count", str(total)), FHIRSearchParam("_total", "accurate")]
        p_search.params.extend(p_params)
        p_patients = p_search.perform_resources(smart.server)
        for patient in p_patients:
            first_name = ""
            last_name = ""
            if patient.name and len(patient.name) > 0:
                if patient.name[0].family:
                    last_name = patient.name[0].family
                if patient.name[0].given and len(patient.name[0].given) > 0:
                    first_name = " ".join(patient.name[0].given)
            results.append({
                "firstName": first_name,
                "lastName": last_name,
                "id": patient.id
            })
        results.sort(key=lambda p: p.get("lastName"))
        return jsonify(results)
    except FHIRValidationError:
        # The server should probably return a more adequate HTTP error code here instead of a 200 OK.
        return jsonify({'error': 'sorry, we\' querying a public server and someone must have entered something \
                                    not valid there'})
    except HTTPError:
        # Same as the error handler above. This is a bad pattern. Should return a HTTP 5xx error instead.
        return jsonify({'error': 'something really bad has happened!'})


# start the app
if '__main__' == __name__:
    logging.basicConfig(level=logging.DEBUG)
    app.run(debug=True, port=8086)
