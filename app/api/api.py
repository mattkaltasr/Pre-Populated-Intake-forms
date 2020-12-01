import json
import logging
from datetime import date

from fhirclient.models.allergyintolerance import AllergyIntolerance, AllergyIntoleranceReaction
from fhirclient.models.backboneelement import BackboneElement
from fhirclient.models.dosage import Dosage
from fhirclient.models.fhirreference import FHIRReference
from fhirclient.models.medicationstatement import MedicationStatement
from fhirclient.models.quantity import Quantity
from fhirclient.models.timing import Timing
from flask import Flask, jsonify, request
from fhirclient import client
from fhirclient.models.patient import Patient
from fhirclient.models.humanname import HumanName
from fhirclient.models.contactpoint import ContactPoint
from fhirclient.models.coding import Coding
from fhirclient.models.address import Address
from fhirclient.models.fhirdate import FHIRDate
from fhirclient.models.medicationrequest import MedicationRequest
from fhirclient.models.medication import Medication
from fhirclient.models.procedure import Procedure
from fhirclient.models.condition import Condition
from fhirclient.models.codeableconcept import CodeableConcept
from fhirclient.models.fhirsearch import FHIRSearchParam
from fhirclient.models.fhirabstractbase import FHIRValidationError
from fhirclient.models.observation import Observation
from fhirclient.models.familymemberhistory import FamilyMemberHistory

from requests.exceptions import HTTPError
from datetime import datetime


def pretty(js):
    """ pretty print a json object """
    return json.dumps(js, indent=2)


# This is only used later in the query to the FHIR server as an example to the team
PEDIATRICS_AGE_LIMIT = (
    date.today() - (date(2000, 12, 31) - date(1980, 1, 1))
).isoformat()

# Needed to initialize the FHIR Client later on
smart_defaults = {
    "app_id": "pre_populated_intake_froms",
    "api_base": "https://apps.hdap.gatech.edu/syntheticmass/baseDstu3",
    # "api_base": "https://hapi.fhir.org/baseDstu3",
}
conditions_list = {
    "38341003": "HyperTension",
    "53741008": "Coronary Heart Disease",
    "195967001": "Asthma (disorder)",
    "197480006": "Anxiety disorder (disorder)",
    "3723001": "Arthritis (disorder)",
    "73211009": "Diabetes mellitus (disorder)",
    "35489007": "Depressive disorder (disorder)",
    "56265001": "Heart disease (disorder)",
    "42343007": "Congestive heart failure (disorder)",
    "86406008": "Human immunodeficiency virus infection (disorder)",
    "95570007": "Kidney stone (disorder)",
    "84757009": "Epilepsy (disorder)",
    "14304000": "Disorder of thyroid gland (disorder)",
    "56717001": "Tuberculosis (disorder)"
}

# Flask app setup
app = Flask(__name__)
from flask_cors import CORS

# CORS(app)


# Creates a FHIRClient object and returns it
def _get_smart():
    return client.FHIRClient(settings=smart_defaults)


@app.route("/api/hello")
def hello():
    return jsonify({"words": ["Hello ", "World ", "!"]})


# Example of a FHIR call that returns all the patients aged 21 and younger
@app.route("/api/patients")
def get_patients():
    """Get all the patients"""
    smart = _get_smart()

    search = Patient.where({"birthdate": f"ge{PEDIATRICS_AGE_LIMIT}"})
    params = [FHIRSearchParam("_count", "1"), FHIRSearchParam("_total", "accurate")]
    search.params.extend(params)
    try:
        results = []
        bundle = search.perform(smart.server)
        total = bundle.total
        print(f"Total={total}")
        p_search = Patient.where({"birthdate": f"ge{PEDIATRICS_AGE_LIMIT}"})
        p_params = [
            FHIRSearchParam("_count", str(total)),
            FHIRSearchParam("_total", "accurate"),
        ]
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
            results.append(
                {"firstName": first_name, "lastName": last_name, "id": patient.id}
            )
        results.sort(key=lambda p: p.get("lastName"))
        return jsonify(results)
    except FHIRValidationError:
        # The server should probably return a more adequate HTTP error code here instead of a 200 OK.
        return jsonify(
            {
                "error": "sorry, we' querying a public server and someone must have entered something \
                                    not valid there"
            }
        )
    except HTTPError:
        # Same as the error handler above. This is a bad pattern. Should return a HTTP 5xx error instead.
        return jsonify({"error": "something really bad has happened!"})


# Get Patient's Personal Info by Id
@app.route("/api/patient/<id>", methods=["GET"])
def getPatient(id):
    smart = _get_smart()
    """ Get Patient Info by Id
    """
    try:
        patient = Patient.read(id, smart.server)
        results = []

        if patient != None:
            first_name = ""
            last_name = ""
            middle_name = ""
            dob = ""
            age = ""
            gender = ""
            address = ""
            city = ""
            state = ""
            postal_code = ""
            country = ""
            relationship_status = ""
            phone_home = ""
            phone_mobile = ""
            email = ""
            preferred_mobile = ""

            # name
            # TODO add middle_name
            if patient.name and len(patient.name) > 0:
                if patient.name[0].family:
                    last_name = patient.name[0].family
                if patient.name[0].given and len(patient.name[0].given) > 0:
                    first_name = " ".join(patient.name[0].given)
            # gender
            if patient.gender:
                gender = patient.gender

            # address
            if len(patient.address) > 0:
                for add in patient.address:
                    for addr_line in add.line:
                        if addr_line:
                            address = addr_line
                    if add.city:
                        city = add.city
                    if add.postalCode:
                        postal_code = add.postalCode
                    if add.state:
                        state = add.state
                    if add.country:
                        country = add.country

            # dob
            if patient.birthDate:
                dob = patient.birthDate.date
                age = int(
                    (
                        datetime.today()
                        - datetime.strptime(patient.birthDate.isostring, "%Y-%m-%d")
                    ).days
                    / 365.2425
                )

                print("age-")
                print(age)

            # relationship status
            if patient.maritalStatus:
                relationship_status = patient.maritalStatus.text

            # phone
            if patient.telecom != None:
                for telecom in patient.telecom:
                    # TODO check the phone system values in SMART FHIR documentation
                    if telecom.system == "phone":
                        if telecom.use == "home":
                            phone_home = telecom.value
                        else:
                            # TODO check the phone use values in SMART FHIR documentation
                            phone_mobile = telecom.value
                    elif telecom.system == "email":
                        email = telecom.value

            results.append(
                {
                    "id": patient.id,
                    "firstName": first_name,
                    "lastName": last_name,
                    "gender": gender,
                    "birthDate": dob,
                    "age": age,
                    "address": address,
                    "city": city,
                    "state": state,
                    "postalCode": postal_code,
                    "country": country,
                    "homePhone": phone_home,
                    "mobilePhone": phone_mobile,
                    "email": email,
                    "relationshipStatus": relationship_status,
                }
            )
        return jsonify(results)
    except FHIRValidationError:
        # The server should probably return a more adequate HTTP error code here instead of a 200 OK.
        return jsonify(
            {
                "error": "sorry, we' querying a public server and someone must have entered something \
                                    not valid there"
            }
        )
    except HTTPError:
        # Same as the error handler above. This is a bad pattern. Should return a HTTP 5xx error instead.
        return jsonify({"error": "something really bad has happened!"})


# Get Medical history by patient id
@app.route("/api/conditions/<id>", methods=["GET"])
def getMedicalHistoryForPatient(id):
    smart = _get_smart()
    """ Get conditions list by patient id
    """
    # 1e19bb7a-d990-4924-9fae-be84f19c53c1
    try:
        results = []
        p_search = Condition.where({"subject": f"Patient/{id}"})
        p_conditions = p_search.perform_resources(smart.server)
        for cond in p_conditions:
            code = ""
            display = ""
            system = ""
            id = ""
            if cond.code:
                id = cond.id
                code = cond.code.coding[0].code
                display = cond.code.coding[0].display
                system = cond.code.coding[0].system

            results.append({"id": id, "code": code, "display": display,"system": system})
        results.sort(key=lambda m: m.get("display"))
        return jsonify(results)

    except FHIRValidationError:
        # The server should probably return a more adequate HTTP error code here instead of a 200 OK.
        return jsonify(
            {
                "error": "sorry, we' querying a public server and someone must have entered something \
                                        not valid there"
            }
        )
    except HTTPError:
        # Same as the error handler above. This is a bad pattern. Should return a HTTP 5xx error instead.
        return jsonify({"error": "something really bad has happened!"})

#PUT Medical History
#only add the new ones (UI to send only the new selected conditions)
@app.route("/api/conditions/<patient_id>", methods=["PUT"])
def addMedicalConditionsForPatient(patient_id):
    smart = _get_smart()
    p_search = Condition.where({"subject": f"Patient/{patient_id}"})
    p_conditions = p_search.perform_resources(smart.server)
    new_conditions = request.json

    #add new ones to existing conditions
    result=[]
    for cond in new_conditions:

        print(cond.get('code') in conditions_list.keys())

        new_condition = Condition()

        if cond.get('code'):
            coding_cond={"system":"http://snomed.info/sct","display":cond.get('display'),"code":cond.get('code')}
            new_condition.code = CodeableConcept(
                {"text": cond.get("display"), "coding": [coding_cond]}
            )
            new_condition.subject = FHIRReference({"reference": f"Patient/{patient_id}"})
            new_condition.clinicalStatus = "active"
            try:
                status = new_condition.create(server=smart.server)
                if status:
                    result.append({"result": "success", "fhir-response": status})
                    print(result)
            except FHIRValidationError:
                # The server should probably return a more adequate HTTP error code here instead of a 200 OK.
                result.append(jsonify({"error": "bad request payload"}))
            except HTTPError:
                # Same as the error handler above. This is a bad pattern. Should return a HTTP 5xx error instead.
                result.append(jsonify({"error": "something really bad has happened!"}))
    return jsonify(result)

# Get Medications by patient id
# TODO to be deleted as home-meds functions will be used in place
@app.route("/api/medications/<id>", methods=["GET"])
def getMedications(id):
    smart = _get_smart()
    """ Get active medication list by patient id
    """
    try:
        results = []
        p_search = MedicationRequest.where(
            struct={"subject": "Patient/" + str(id), "status": "active"}
        )
        p_medications = p_search.perform_resources(smart.server)
        print(id)
        print(len(p_medications))

        for med in p_medications:
            dosage = ""
            timing = ""
            medication = ""
            condition = ""

            med_id = med.medicationReference.reference.split("/")[1]
            med_result = Medication.read(med_id, smart.server)
            if med_result.code:
                medication = med_result.code.coding[0].display

            cond_id = med.reasonReference[0].reference.split("/")[1]
            cond_result = Condition.read(cond_id, smart.server)
            if cond_result.code:
                condition = cond_result.code.coding[0].display

            # coudlnt test it
            if med.dosageInstruction:
                dosage = med.dosageInstruction[0].text
                timing = med.dosageInstruction[0].timing.repeat.frequency

            results.append(
                {
                    "medication": medication,
                    "condition": condition,
                    "dosage": dosage,
                    "frequency": timing,
                }
            )
        # Patient/40f680c8-238b-426b-b1c0-1649c780ce69
        results.sort(key=lambda m: m.get("medication"))
        return jsonify(results)

    except FHIRValidationError:
        # The server should probably return a more adequate HTTP error code here instead of a 200 OK.
        return jsonify(
            {
                "error": "sorry, we' querying a public server and someone must have entered something \
                                        not valid there"
            }
        )
    except HTTPError:
        # Same as the error handler above. This is a bad pattern. Should return a HTTP 5xx error instead.
        return jsonify({"error": "something really bad has happened!"})


@app.route("/api/healthhabits/<id>", methods=["GET"])
def getHealthHabitsForPatient(id):
    smart = _get_smart()
    """
    Get health habit Observations by patient id
    """
    try:
        results = []
        o_search = Observation.where(struct={"subject": "Patient/" + str(id)})
        o_observation = o_search.perform_resources(smart.server)
        print(id)
        print(o_observation)
        for obs in o_observation:
            if (obs.code.coding[0].system == "http://loinc.org") and (
                obs.code.coding[0].code == "72166-2"
            ):
                # Shows nominal codes underneath smoking status https://loinc.org/72166-2/
                code = obs.valueCodeableConcept.coding[0].code
                display = obs.valueCodeableConcept.coding[0].display
                results.append({"smokingStatus": {"code": code, "display": display}})
            elif (obs.code.coding[0].system == "http://loinc.org") and (
                obs.code.coding[0].code == "8663-7"
            ):
                value = obs.valueQuantity.value
                results.append({"smokingRate": {"value": value}})
            elif (obs.code.coding[0].system == "http://acme-rehab.org") and (
                obs.code.coding[0].code == "alcohol-type"
            ):
                # https://hl7.org/fhir/2018May/observation-example-alcohol-type.html
                results.append({"useAlcohol": True})
        return jsonify(results)

    except FHIRValidationError:
        # The server should probably return a more adequate HTTP error code here instead of a 200 OK.
        return jsonify(
            {
                "error": "sorry, we' querying a public server and someone must have entered something \
                                        not valid there"
            }
        )
    except HTTPError:
        # Same as the error handler above. This is a bad pattern. Should return a HTTP 5xx error instead.
        return jsonify({"error": "something really bad has happened!"})


# TODO Get Family Medical History

# requires "api_base": "https://hapi.fhir.org/baseDstu3",
# patient id:  2743900
# returns a prostate cancer history item
@app.route('/api/family_member_history/<id>', methods=['GET'])
def get_family_member_history_for_patient(id):
    smart = _get_smart()
    """
    Get Family Member History Observations by patient id
    """


    try:
        results = []
        p_search = FamilyMemberHistory.where(struct={'patient': "Patient/" + str(id)})
        p_history = p_search.perform_resources(smart.server)
        print(id)
        print(len(p_history))

        for hist in p_history:
            brief_display = ''
            relationship = ''
            if hist.relationship:
                relationship = hist.relationship.coding[0].display.lower()
            code = ''
            display = ''
            hist_id = ''
            system = ''
            if hist.condition:
                code = hist.condition[0].code.coding[0].code
                display = hist.condition[0].code.coding[0].display
                system = hist.condition[0].code.coding[0].system
            if hist.id:
                hist_id = hist.id
            if relationship not in ['mother', 'father', 'sister', 'brother']:
                relationship = ''

            for form_condition in ['cancer', 'heart', 'diabetes']:
                if 'cancer' in form_condition:
                    brief_display = form_condition

            if relationship != '' and brief_display != '':
                brief = {"brief_display" : brief_display, "relationship" : relationship }
                details = {"code": code, "display": display, "id": hist_id, "system": system}
                results.append({"brief": brief, "details": details})

        # results.sort(key=lambda m: m.get("display"))
        return jsonify(results)

    except FHIRValidationError:
        # The server should probably return a more adequate HTTP error code here instead of a 200 OK.
        return jsonify({'error': 'sorry, we\' querying a public server and someone must have entered something \
                                            not valid there'})
    except HTTPError:
        # Same as the error handler above. This is a bad pattern. Should return a HTTP 5xx error instead.
        return jsonify({'error': 'something really bad has happened!'})



# TODO get surgical history
@app.route("/api/Procedure/<id>", methods=["GET"])
def getSurgicalHistoryForPatient(id):
    smart = _get_smart()
    """ Get procedure list by patient id
    """
    # 1e19bb7a-d990-4924-9fae-be84f19c53c1
    try:
        results = []
        p_search = Procedure.where(struct={"subject": "Patient/" + str(id)})
        p_procedure = p_search.perform_resources(smart.server)
        print(id)
        print(len(p_procedure))
        for proc in p_procedure:
            code = ""
            display = ""

            if proc.code:
                date = None
                if proc.performedDateTime is not None:
                    date = proc.performedDateTime.isostring

                code = proc.code.coding[0].code
                display = proc.code.coding[0].display

            results.append({"code": code, "display": display, "date": date})
        results.sort(key=lambda m: m.get("display"))
        return jsonify(results)

    except FHIRValidationError:
        # The server should probably return a more adequate HTTP error code here instead of a 200 OK.
        return jsonify(
            {
                "error": "sorry, we' querying a public server and someone must have entered something \
                                        not valid there"
            }
        )
    except HTTPError:
        # Same as the error handler above. This is a bad pattern. Should return a HTTP 5xx error instead.
        return jsonify({"error": "something really bad has happened!"})


# TODO post surgical history
# @app.route("/api/Procedure/<id>", methods==["PUT"])
# def update_SurgicalHistoryForPatient(id):
# TODO post surgical history
#needs to add in fields for this unsure of how



# POST - Patient Info Update
@app.route("/api/patient/save", methods=["PUT"])
def updatePatient():
    smart = _get_smart()
    try:
        # prep patient info
        print(request.json,)  # ["id"])
        patient = preparePatientInfo(request.json, smart)
        result = patient.update(server=smart.server)
        print(result)
        return jsonify(result)
    except FHIRValidationError:
        # The server should probably return a more adequate HTTP error code here instead of a 200 OK.
        return jsonify(
            {
                "error": "sorry, we' querying a public server and someone must have entered something \
                                    not valid there"
            }
        )
    except HTTPError:
        # Same as the error handler above. This is a bad pattern. Should return a HTTP 5xx error instead.
        return jsonify({"error": "something really bad has happened!"})


def preparePatientInfo(patientInfo, smart):

    # get existing patient info
    patient = patient = Patient.read(patientInfo["id"], smart.server)
    # update the new info and other details preparePatientInfo not changed.

    # TODO check if we want to allow patient to update name and date of both through the screen?
    # First, last names
    # if 'firstName' in patientInfo or 'lastname' in patientInfo:
    #    updatedName = HumanName()
    #    updatedName.use = "official"
    #    if 'firstname' in patientInfo and patientInfo['firstname']:
    #        updatedName.given = [patientInfo['firstname']]
    #    if 'lastname' in patientInfo and patientInfo['lastname']:
    #        updatedName.family = patientInfo['lastname']
    #    patient.name = [updatedName]

    # Birth Date
    # if 'birthDate' in patientInfo:
    #   birthdate = FHIRDate(patientInfo['dob'])
    #  patient.birthDate = birthdate

    # Gender
    if "gender" in patientInfo:
        patient.gender = patientInfo["gender"]

    # address details update
    if "address" in patientInfo:
        address = Address()
        if "address" in patientInfo:
            address.line = [patientInfo["address"]]
        if "city" in patientInfo:
            address.city = patientInfo["city"]
        if "state" in patientInfo:
            address.state = patientInfo["state"]
        if "country" in patientInfo:
            address.country = patientInfo["country"]
        if "postalCode" in patientInfo:
            address.postalCode = patientInfo["postalCode"]
        patient.address = [address]

    # Email/Phone
    if (
        "email" in patientInfo
        or "homePhone" in patientInfo
        or "mobilePhone" in patientInfo
    ):
        patient.telecom = []
        if "email" in patientInfo:
            email = ContactPoint()
            email.system = "email"
            email.value = patientInfo["email"]
            patient.telecom.append(email)
        if "homePhone" in patientInfo:
            phone = ContactPoint()
            phone.system = "phone"
            phone.use = "home"
            phone.value = patientInfo["homePhone"]
            patient.telecom.append(phone)
        if "mobilePhone" in patientInfo:
            phone = ContactPoint()
            phone.system = "phone"
            phone.use = "mobile"
            phone.value = patientInfo["mobilePhone"]
            patient.telecom.append(phone)

    if "relationshipStatus" in patientInfo:
        maritalStatus = CodeableConcept()
        # maritalStatus.coding = ''
        maritalStatus.text = patientInfo["relationshipStatus"]
        patient.maritalStatus = maritalStatus

    return patient


@app.route('/api/home-med/<patient_id>', methods=['GET'])
def get_home_medications(patient_id):
    smart = _get_smart()
    results = []
    search = MedicationStatement.where({"subject": f"Patient/{patient_id}"})
    meds = search.perform_resources(smart.server)
    for med in meds:
        med_obj = {
            "id": med.id,
            "medication": {"system": "", "code": "", "display": ""},
            "condition": {"system": "", "code": "", "display": ""},
            "dosage": {"system": "", "code": "", "value": "", "unit": ""},
            "frequency": {"frequency": "", "period": "", "periodUnit": ""},
        }
        if med.medicationCodeableConcept:
            if (
                med.medicationCodeableConcept.coding
                and len(med.medicationCodeableConcept.coding) > 0
            ):
                if med.medicationCodeableConcept.coding[0].system:
                    med_obj["medication"][
                        "system"
                    ] = med.medicationCodeableConcept.coding[0].system
                if med.medicationCodeableConcept.coding[0].code:
                    med_obj["medication"][
                        "code"
                    ] = med.medicationCodeableConcept.coding[0].code
                if med.medicationCodeableConcept.coding[0].display:
                    med_obj["medication"][
                        "display"
                    ] = med.medicationCodeableConcept.coding[0].display
        if med.reasonCode and len(med.reasonCode) > 0:
            if med.reasonCode[0].coding and len(med.reasonCode[0].coding) > 0:
                if med.reasonCode[0].coding[0].system:
                    med_obj["condition"]["system"] = med.reasonCode[0].coding[0].system
                if med.reasonCode[0].coding[0].code:
                    med_obj["condition"]["code"] = med.reasonCode[0].coding[0].code
                if med.reasonCode[0].coding[0].display:
                    med_obj["condition"]["display"] = (
                        med.reasonCode[0].coding[0].display
                    )
        if med.dosage and len(med.dosage) > 0:
            if med.dosage[0].doseQuantity:
                if med.dosage[0].doseQuantity.system:
                    med_obj["dosage"]["system"] = med.dosage[0].doseQuantity.system
                if med.dosage[0].doseQuantity.code:
                    med_obj["dosage"]["code"] = med.dosage[0].doseQuantity.code
                if med.dosage[0].doseQuantity.value:
                    med_obj["dosage"]["value"] = med.dosage[0].doseQuantity.value
                if med.dosage[0].doseQuantity.unit:
                    med_obj["dosage"]["unit"] = med.dosage[0].doseQuantity.unit
            if med.dosage[0].timing:
                if med.dosage[0].timing.repeat:
                    if med.dosage[0].timing.repeat.frequency:
                        med_obj["frequency"]["frequency"] = med.dosage[
                            0
                        ].timing.repeat.frequency
                    if med.dosage[0].timing.repeat.period:
                        med_obj["frequency"]["period"] = med.dosage[
                            0
                        ].timing.repeat.period
                    if med.dosage[0].timing.repeat.periodUnit:
                        med_obj["frequency"]["periodUnit"] = med.dosage[
                            0
                        ].timing.repeat.periodUnit
        results.append(med_obj)
    return jsonify(results)


@app.route("/api/home-med/<med_statement_id>", methods=["PUT"])
def update_home_medication(med_statement_id):
    smart = _get_smart()
    med_statement = MedicationStatement.read(med_statement_id, smart.server)
    new_medication = request.json.get("medication")
    new_condition = request.json.get("condition")
    new_dosage = request.json.get("dosage")
    new_frequency = request.json.get("frequency")
    if new_medication:
        med_statement.medicationCodeableConcept.coding = [Coding(new_medication)]
        med_statement.medicationCodeableConcept.text = new_medication.get("display")
    if new_condition:
        med_statement.reasonCode = [
            CodeableConcept(
                {"text": new_condition.get("display"), "coding": [new_condition]}
            )
        ]
    if new_dosage:
        if med_statement.dosage and len(med_statement.dosage) > 0:
            med_statement.dosage[0].doseQuantity = Quantity(new_dosage)
        else:
            med_statement.dosage = [Dosage({"doseQuantity": new_dosage})]
    if new_frequency:
        if med_statement.dosage and len(med_statement.dosage) > 0:
            med_statement.dosage[0].timing = Timing({"repeat": new_frequency})
        else:
            med_statement.dosage = [Dosage({"timing": {"repeat": new_frequency}})]
    try:
        result = med_statement.update(smart.server)
        if result:
            return jsonify({"result": "success", "fhir-response": result})
    except FHIRValidationError:
        # The server should probably return a more adequate HTTP error code here instead of a 200 OK.
        return jsonify({"error": "bad request payload"})
    except HTTPError:
        # Same as the error handler above. This is a bad pattern. Should return a HTTP 5xx error instead.
        return jsonify({"error": "something really bad has happened!"})


@app.route("/api/home-med/<patient_id>", methods=["POST"])
def create_home_medication(patient_id):
    smart = _get_smart()
    med_statement = MedicationStatement()
    new_medication = request.json.get("medication")
    new_condition = request.json.get("condition")
    new_dosage = request.json.get("dosage")
    new_frequency = request.json.get("frequency")
    med_statement.subject = FHIRReference({"reference": f"Patient/{patient_id}"})
    med_statement.status = "active"
    med_statement.taken = "y"
    if new_medication:
        med_statement.medicationCodeableConcept = CodeableConcept(
            {"coding": [new_medication], "text": new_medication.get("display")}
        )
    if new_condition:
        med_statement.reasonCode = [
            CodeableConcept(
                {"text": new_condition.get("display"), "coding": [new_condition]}
            )
        ]
    if new_dosage or new_frequency:
        med_statement.dosage = [Dosage()]
    if new_dosage:
        med_statement.dosage[0].doseQuantity = Quantity(new_dosage)
    if new_frequency:
        med_statement.dosage[0].timing = Timing({"repeat": new_frequency})

    try:
        result = med_statement.create(smart.server)
        if result:
            return jsonify({"result": "success", "fhir-response": result})
    except FHIRValidationError:
        # The server should probably return a more adequate HTTP error code here instead of a 200 OK.
        return jsonify({"error": "bad request payload"})
    except HTTPError as e:
        print(e)
        # Same as the error handler above. This is a bad pattern. Should return a HTTP 5xx error instead.
        return jsonify({"error": "something really bad has happened!"})



@app.route('/api/drug-allergy/<patient_id>', methods=['GET'])
def get_drug_allergies(patient_id):
    smart = _get_smart()
    results = []
    search = AllergyIntolerance.where({
        'patient': f'Patient/{patient_id}',
        'category': 'medication'
    })
    allergies = search.perform_resources(smart.server)
    for allergy in allergies:
        allergy_obj = {
            "id": allergy.id,
            "medication": {
                "system": "",
                "code": "",
                "display": ""
            },
            "reaction": {
                "system": "",
                "code": "",
                "display": ""
            }
        }
        if allergy.code:
            if allergy.code.coding and len(allergy.code.coding) > 0:
                if allergy.code.coding[0].system:
                    allergy_obj["medication"]["system"] = allergy.code.coding[0].system
                if allergy.code.coding[0].code:
                    allergy_obj["medication"]["code"] = allergy.code.coding[0].code
                if allergy.code.coding[0].display:
                    allergy_obj["medication"]["display"] = allergy.code.coding[0].display
        if allergy.reaction and len(allergy.reaction) > 0:
            if allergy.reaction[0].manifestation and len(allergy.reaction[0].manifestation) > 0:
                if allergy.reaction[0].manifestation[0].coding and len(allergy.reaction[0].manifestation[0].coding) > 0:
                    if allergy.reaction[0].manifestation[0].coding[0].system:
                        allergy_obj["reaction"]["system"] = allergy.reaction[0].manifestation[0].coding[0].system
                    if allergy.reaction[0].manifestation[0].coding[0].code:
                        allergy_obj["reaction"]["code"] = allergy.reaction[0].manifestation[0].coding[0].code
                    if allergy.reaction[0].manifestation[0].coding[0].display:
                        allergy_obj["reaction"]["display"] = allergy.reaction[0].manifestation[0].coding[0].display
        results.append(allergy_obj)
    return jsonify(results)


@app.route('/api/drug-allergy/<patient_id>', methods=['POST'])
def create_drug_allergy(patient_id):
    smart = _get_smart()
    drug_allergy = AllergyIntolerance()
    new_drug_allergy = request.json.get("medication")
    new_reaction = request.json.get("reaction")
    drug_allergy.patient = FHIRReference({"reference": f"Patient/{patient_id}"})
    drug_allergy.verificationStatus = "confirmed"
    drug_allergy.clinicalStatus = "active"
    drug_allergy.category = ["medication"]
    if new_drug_allergy:
        drug_allergy.code = CodeableConcept({"coding": [new_drug_allergy], "text": new_drug_allergy.get("display")})
    if new_reaction:
        drug_allergy.reaction = [AllergyIntoleranceReaction({
            "manifestation": [{
                "text": new_reaction.get("display"),
                "coding": [new_reaction]
            }]
        })]

    try:
        result = drug_allergy.create(smart.server)
        if result:
            return jsonify({"result": "success", "fhir-response": result})
    except FHIRValidationError:
        # The server should probably return a more adequate HTTP error code here instead of a 200 OK.
        return jsonify({'error': 'bad request payload'})
    except HTTPError as e:
        print(e)
        # Same as the error handler above. This is a bad pattern. Should return a HTTP 5xx error instead.
        return jsonify({'error': 'something really bad has happened!'})


# start the app
if "__main__" == __name__:
    logging.basicConfig(level=logging.DEBUG)
    app.run(debug=True, port=8086)
