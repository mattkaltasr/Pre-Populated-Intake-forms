import logging
from datetime import date
from flask import Flask, request
from flask import jsonify
from fhirclient import client
from fhirclient.models.patient import Patient
from fhirclient.models.humanname import HumanName
from fhirclient.models.contactpoint import ContactPoint
from fhirclient.models.codeableconcept import CodeableConcept
from fhirclient.models.address import Address
from fhirclient.models.fhirdate import FHIRDate
from fhirclient.models.medicationrequest import MedicationRequest
from fhirclient.models.medication import Medication
from fhirclient.models.condition import Condition
from fhirclient.models.fhirsearch import FHIRSearchParam
from fhirclient.models.fhirabstractbase import FHIRValidationError
from requests.exceptions import HTTPError
from datetime import datetime

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


# Get Patient's Personal Info by Id
@app.route('/api/patient/<id>', methods=['GET'])
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

            #name
            #TODO add middle_name
            if patient.name and len(patient.name) > 0:
                if patient.name[0].family:
                    last_name = patient.name[0].family
                if patient.name[0].given and len(patient.name[0].given) > 0:
                    first_name = " ".join(patient.name[0].given)
            #gender
            if patient.gender:
                gender = patient.gender

            #address
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

            #dob
            if patient.birthDate:
                dob = patient.birthDate.date
                age = int((datetime.today() - datetime.strptime(patient.birthDate.isostring, '%Y-%m-%d')).days / 365.2425)

                print("age-")
                print(age)

            #relationship status
            if patient.maritalStatus:
                relationship_status = patient.maritalStatus.text

            #phone
            if patient.telecom != None:
                for telecom in patient.telecom:
                    #TODO check the phone system values in SMART FHIR documentation
                    if telecom.system == "phone":
                        if telecom.use == "home":
                            phone_home = telecom.value
                        else:
                            #TODO check the phone use values in SMART FHIR documentation
                            phone_mobile = telecom.value
                    elif telecom.system == "email":
                        email = telecom.value

            results.append({
                "id": patient.id,
                "firstName": first_name,
                "lastName": last_name,
                "gender": gender,
                "birthDate": dob,
                "age":age,
                "address": address,
                "city": city,
                "state": state,
                "postalCode": postal_code,
                "country": country,
                "homePhone": phone_home,
                "mobilePhone": phone_mobile,
                "email": email,
                "relationshipStatus": relationship_status
            })
        return jsonify(results)
    except FHIRValidationError:
        # The server should probably return a more adequate HTTP error code here instead of a 200 OK.
        return jsonify({'error': 'sorry, we\' querying a public server and someone must have entered something \
                                    not valid there'})
    except HTTPError:
        # Same as the error handler above. This is a bad pattern. Should return a HTTP 5xx error instead.
        return jsonify({'error': 'something really bad has happened!'})

#TODO Get Medical history by patient id
@app.route('/api/conditions/<id>', methods=['GET'])
def getMedicalHistoryForPatient(id):
    smart = _get_smart()
    """ Get conditions list by patient id
    """
    #1e19bb7a-d990-4924-9fae-be84f19c53c1
    try:
        results = []
        p_search = Condition.where(struct={'subject': "Patient/"+str(id)})
        p_conditions = p_search.perform_resources(smart.server)
        print(id)
        print(len(p_conditions))
        for cond in p_conditions:
            code=""
            display =""
            if cond.code:
                code = cond.code.coding[0].code
                display = cond.code.coding[0].display
            results.append({
                           "code": code,
                           "display": display
                       })
        results.sort(key=lambda m: m.get("display"))
        return jsonify(results)

    except FHIRValidationError:
            # The server should probably return a more adequate HTTP error code here instead of a 200 OK.
            return jsonify({'error': 'sorry, we\' querying a public server and someone must have entered something \
                                        not valid there'})
    except HTTPError:
        # Same as the error handler above. This is a bad pattern. Should return a HTTP 5xx error instead.
        return jsonify({'error': 'something really bad has happened!'})
#TODO Get Medications by patient id
@app.route('/api/medications/<id>', methods=['GET'])
def getMedications(id):
    smart = _get_smart()
    """ Get active medication list by patient id
    """
    try:
        results = []
        p_search = MedicationRequest.where(struct={'subject': "Patient/"+str(id), 'status':'active'})
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

           cond_id=med.reasonReference[0].reference.split("/")[1]
           cond_result = Condition.read(cond_id, smart.server)
           if cond_result.code:
                condition = cond_result.code.coding[0].display

           #coudlnt test it
           if med.dosageInstruction:
                dosage = med.dosageInstruction[0].text
                timing = med.dosageInstruction[0].timing.repeat.frequency

           results.append({
                           "medication": medication,
                           "condition": condition,
                           "dosage": dosage,
                           "frequency":timing
                       })
        #Patient/40f680c8-238b-426b-b1c0-1649c780ce69
        results.sort(key=lambda m: m.get("medication"))
        return jsonify(results)

    except FHIRValidationError:
            # The server should probably return a more adequate HTTP error code here instead of a 200 OK.
            return jsonify({'error': 'sorry, we\' querying a public server and someone must have entered something \
                                        not valid there'})
    except HTTPError:
        # Same as the error handler above. This is a bad pattern. Should return a HTTP 5xx error instead.
        return jsonify({'error': 'something really bad has happened!'})

#TODO Get allergies by patient id

#TODO Get Health habits (alcohol use, smoking, drug use)
#TODO Get Family Medical History

#TODO POST - Patient Info Update
#WIP
@app.route('/api/patient/save', methods=['PUT'])
def updatePatient():
    smart = _get_smart()
    try:
        #prep patient info
        patient = preparePatientInfo(request.get_json())

        result = patient.create(server=smart.server)
        print(result)
    except FHIRValidationError:
        # The server should probably return a more adequate HTTP error code here instead of a 200 OK.
        return jsonify({'error': 'sorry, we\' querying a public server and someone must have entered something \
                                    not valid there'})
    except HTTPError:
        # Same as the error handler above. This is a bad pattern. Should return a HTTP 5xx error instead.
        return jsonify({'error': 'something really bad has happened!'})

def preparePatientInfo(patientInfo):

    patient = Patient()
    patient.id = patientInfo['id']

    # First, last names
    if 'firstName' in patientInfo or 'lastname' in patientInfo:
        updatedName = HumanName()
        if 'firstname' in patientInfo and patientInfo['firstname']:
            updatedName.given = [patientInfo['firstname']]
        if 'lastname' in patientInfo and patientInfo['lastname']:
            updatedName.family = patientInfo['lastname']
        patient.name = [updatedName]

    #Gender
    if 'gender' in patientInfo:
        patient.gender = patientInfo['gender']

    # Birth Date
    #if 'birthDate' in patientInfo:
     #   birthdate = FHIRDate(patientInfo['dob'])
      #  patient.birthDate = birthdate

    # address details update
    if 'address' in patientInfo:
        address = Address()
        if 'address' in patientInfo:
            address.line = [patientInfo['address']]
        if 'city' in patientInfo:
            address.city = patientInfo['city']
        if 'state' in patientInfo:
            address.state = patientInfo['state']
        if 'country' in patientInfo:
            address.country = patientInfo['country']
        if 'postalCode' in patientInfo:
            address.postalCode = patientInfo['postalCode']
        patient.address = [address]

    # Email/Phone
    if 'email' in patientInfo or 'homePhone' in patientInfo or 'mobilePhone' in patientInfo:
        patient.telecom = []
        if 'email' in patientInfo:
            email = ContactPoint()
            email.system = 'email'
            email.value = patientInfo['email']
            patient.telecom.append(email)
        if 'homePhone' in patientInfo:
            phone = ContactPoint()
            phone.system = 'phone'
            phone.use = 'home'
            phone.value = patientInfo['homePhone']
            patient.telecom.append(phone)
        if 'mobilePhone' in patientInfo:
            phone = ContactPoint()
            phone.system = 'phone'
            phone.use = 'mobile'
            phone.value = patientInfo['mobilePhone']
            patient.telecom.append(phone)

        if 'relationshipStatus' in patientInfo:
            maritalStatus = CodeableConcept()
           # maritalStatus.coding = ''
            maritalStatus.text = patientInfo['relationshipStatus']
            patient.maritalStatus = maritalStatus

    return patient

# start the app
if '__main__' == __name__:
    logging.basicConfig(level=logging.DEBUG)
    app.run(debug=True, port=8086)
