# Pre-populated Intake Forms

[![Build Status](https://drone.hdap.gatech.edu/api/badges/gt-cs6440-hit-fall2020/Pre-Populated-Intake-Forms/status.svg?ref=refs/heads/stable)](https://drone.hdap.gatech.edu/gt-cs6440-hit-fall2020/Pre-Populated-Intake-Forms)

Intake forms are almost always filled out manually by patients even when the information required 
is readily available in individual health records. This is both cumbersome for patients and increases 
the chances of inaccuracy in reporting, particularly around existing conditions and medications. 

The project team should build an intake form application that pulls from patient records 
(represented as **[FHIR](https://www.hl7.org/fhir/)**) and pre-populates all relevant data common to intake forms, 
from the perspective of a patient logging into a tele-health service.

## Local build and deployment using Docker (RECOMMENDED)

### Pre-requisites
* docker-cli

### Build and deployment steps

Run the following commands:
    
    * cd app
    * docker-compose build
    * docker-compose up
    
Start your favorite web browser and navigate to: 
[http://localhost:8080/pre-populated-intake-forms-app/](http://localhost:8080/pre-populated-intake-forms-app/)

## Local build and deployment (~~Docker~~)

### Pre-requisites
* Python 3.8.5
* NodeJS 14.6
* nginx

### Build and deployment steps

#### Python

**Tip**: It's highly recommended that you use pipenv or virtualenv to manage your local python dependencies/environment.

1. Install Python dependencies:

        pip install -r app/api/requirements.txt

2. Run the application server:

        python app/api/api.py
   
    You should see something like this (you will need the URL in this log to interact with the application):
   
        * Serving Flask app "api" (lazy loading)
        * Environment: production
          WARNING: This is a development server. Do not use it in a production deployment.
          Use a production WSGI server instead.
        * Debug mode: on
        INFO:werkzeug: * Running on http://127.0.0.1:8086/ (Press CTRL+C to quit)
        INFO:werkzeug: * Restarting with stat
        WARNING:werkzeug: * Debugger is active!
        INFO:werkzeug: * Debugger PIN: 366-108-563

3. Test the application:

        curl -X GET <URL_FROM_PREVIOUS_LOG_MESSAGE>/api/hello
  
    You should receive the following response:
    
        {
          "words": [
            "Hello ", 
            "World ", 
            "!"
          ]
        }
    ##### API Endpoints
    * Get all Patients
    `<BASE_URL>/api/patients`
    * Get Patient Personal Info by Patient Id
    `<BASE_URL>/api/patient/<id>`
    * Get Medications by Patient Id
    `<BASE_URL>/api/medications/<id>`
    * Get Conditions by Patient Id
    `<BASE_URL>/api/conditions/<id>`
    * Save (PUT) Patient Info
    `<BASE_URL>/api/patient/save`
        
        Note: Name, Birthdate excluded from patient save
            
        Sample body json:
            
                {
                  "address": "Suite 243",
                  "city": "Adams",
                  "country": "US",
                  "email": "test@test.com",
                  "gender": "male",
                  "homePhone": "288-062-3563 x70396",
                  "id": "5d810b5e-29d9-4faa-81bc-e0ca1ca4b394",
                  "mobilePhone": "123-456-9999",
                  "postalCode": "01220",
                  "relationshipStatus": "M",
                  "state": "MA"
                }
    * Add (PUT) Conditions
        `<BASE_URL>/api/conditions/<patient_id>`
            
        The endpoint expects a list of new conditions that need to be added to the patient
            
        Sample body json:
                    
                [{
                        "code": "38341003",
                        "display": "Hypertension",
                        "system": "http://snomed.info/sct"
                    },
                     {
                        "system": "http://snomed.info/sct",
                        "code": "22298006",
                        "display": "Myocardial Infarction"
                    }]

  
    
    

## Authors

- Marouane Marzouki ([mmarzouki3@gatech.edu](mailto:mmarzouki3@gatech.edu))
- Matthew Kalita ([mkalita6@gatech.edu](mailto:mkalita6@gatech.edu))
- Ed Hayes ([ehayes9@gatech.edu](mailto:ehayes9@gatech.edu))
- Anthony Bosshardt ([abosshardt6@gatech.edu](mailto:abosshardt6@gatech.edu))
- Parul Khosla ([pkhosla3@gatech.edu](mailto:pkhosla3@gatech.edu))
- Daniel Arch ([darch3@gatech.edu](mailto:darch3@gatech.edu))
