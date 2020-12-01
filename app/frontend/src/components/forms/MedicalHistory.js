/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import FormContainer from "../containers/FormContainer";
import Checkbox from "../formElements/Checkbox";
import { loadPatientInfoById, savePatientData } from "../../util/apiHelpers";
import Medications from "./MedicalHistory/Medications";
import SurgicalHistory from "./MedicalHistory/SurgicalHistory";
import MedicationAllergies from "./MedicalHistory/MedicationAllergies";
import HealthHabits from "./MedicalHistory/HealthHabits";
import FamilyMedicalHistory from "./MedicalHistory/FamilyMedicalHistory";
import Button from "../formElements/Button";

const conditions = [
  { display: "Anxiety", code: "48694002" },
  { display: "Asthma", code: "195967001" },
  { display: "Arthritis", code: "202031002" },
  { display: "Cancer", code: "395099008" },
  { display: "Diabetes", code: "486940021" }, // ??
  { display: "Depression", code: "35489007" }, // depressive disorder
  { display: "Heart Attack", code: "22298006" },
  { display: "High Blood Pressure", code: "38341003" },
  { display: "HIV/AIDS", code: "19030005" },
  { display: "Kidney Stones", code: "64033007" },
  { display: "Seizures", code: "230433003" },
  { display: "Stroke", code: "230690007" },
  { display: "Thyroid Disease", code: "14304000" },
  { display: "Tuberculosis", code: "56717001" },
  { display: "Sore Throat", code: "43878008" },
];

const conditionByCode = _.keyBy(conditions, (c) => c.code);

/** these should probably be stowed away in a
 *  css class, but that would require wiring up
 *  an additional prop in each formElement to handle
 *  concatenating an exogenous class. OK for now
 */

const checkboxStyle = {
  padding: "0.25em",
  border: "1px solid lightgray",
  borderRadius: 0,
  margin: 0,
  width: "20%",
  fontSize: "0.9em",
  minWidth: "120px",
};

const MedicalHistory = ({ selectedPatientId }) => {
  const [patientAnswersMedications, setAnswersMedications] = React.useState({}); // hold patient/user responses
  const [patientDataMedications, setPatientDataMedications] = React.useState(
    {}
  ); // "immutable" copy of fhir data

  const [patientAnswersConditions, setAnswersConditions] = React.useState({});
  const [patientDataConditions, setPatientDataConditions] = React.useState({});

  const [patientAnswersSurgical, setAnswersSurgical] = React.useState({});
  const [patientDataSurgical, setPatientDataSurgical] = React.useState({});

  const [
    patientAnswersMedicationAllergies,
    setAnswersMedicationAllergies,
  ] = React.useState({});

  const [
    patientDataMedicationAllergies,
    setPatientDataMedicationAllergies,
  ] = React.useState({});

  const [
    patientAnswersFamMedicalHistory,
    setAnswersFamMedicalHistory,
  ] = React.useState({});
  const [
    patientDataFamMedicalHistory,
    setPatientDataFamMedicalHistory,
  ] = React.useState({});

  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (selectedPatientId) {
      loadPatientInfoById({
        patientId: selectedPatientId,
        endpoint: "conditions",
        setLoading,
        setData: (data) => {
          const result = data || [];

          if (result) {
            const truthValues = result.reduce((a, v) => {
              a[v.code] = true;
              return a;
            }, {});

            setAnswersConditions({
              ...patientAnswersConditions,
              conditions: truthValues,
            });
            setPatientDataConditions({
              ...patientDataConditions,
              conditions: truthValues,
            });
          }
        },
      });

      loadPatientInfoById({
        patientId: selectedPatientId,
        endpoint: "medications",
        setLoading,
        setData: (data) => {
          const result = data || [];

          if (result) {
            setAnswersMedications({
              ...patientAnswersMedications,
              medications: result,
            });
            setPatientDataMedications({
              ...patientDataMedications,
              medications: result,
            });
          }
        },
      });

      loadPatientInfoById({
        patientId: selectedPatientId,
        endpoint: "drug-allergy",
        setLoading,
        setData: (data) => {
          const result = data || [];

          if (result) {
            setAnswersMedicationAllergies({
              ...patientAnswersMedicationAllergies,
              allergies: result,
            });
            setPatientDataMedicationAllergies({
              ...patientDataMedicationAllergies,
              allergies: result,
            });
          }
        },
      });

      loadPatientInfoById({
        patientId: selectedPatientId,
        endpoint: "family_member_history",
        setLoading,
        setData: (data) => {
          const result = data || [];

          if (result) {
            setAnswersFamMedicalHistory({
              ...patientAnswersFamMedicalHistory,
              familyMedicalHistory: result,
            });
            setPatientDataFamMedicalHistory({
              ...patientDataFamMedicalHistory,
              familyMedicalHistory: result,
            });
          }
        },
      });

      loadPatientInfoById({
        patientId: selectedPatientId,
        endpoint: "healthhabits",
        setLoading,
        setData: (data) => {
          const result = data || [];
          // console.log("healthhabits: ", data);

          if (result) {
            console.log("healthabits: ", result);
            // setAnswersMedications({
            //   ...patientAnswersMedications,
            //   medications: result,
            // });
            // setPatientDataMedications({
            //   ...patientDataMedications,
            //   medications: result,
            // });
          }
        },
      });

      loadPatientInfoById({
        patientId: selectedPatientId,
        endpoint: "Procedure",
        setLoading,
        setData: (data) => {
          const result = data || [];

          if (result) {
            setAnswersSurgical({
              ...patientAnswersSurgical,
              surgical: result,
            });
            setPatientDataSurgical({
              ...patientDataSurgical,
              surgical: result,
            });
          }
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPatientId]);

  const setConditionValue = (key, value) => {
    setAnswersConditions({
      ...patientAnswersConditions,
      conditions: {
        ...(patientAnswersConditions.conditions || {}),
        [key]: value,
      },
    });
    setIsSubmitted(false);
  };

  const setSurgicalValue = (key, value) => {
    setAnswersSurgical({
      ...patientAnswersSurgical,
      surgical: {
        ...(patientAnswersSurgical.surgical || {}),
        [key]: value,
      },
    });
    setIsSubmitted(false);
  };

  /** edit a specific medication's field in array */
  const setMedicationValue = (medicationIndex, key, value) =>
    setAnswersMedications({
      ...patientAnswersMedications,
      medications: _.get(patientAnswersMedications, "medications", [])
        .slice(0, medicationIndex)
        .concat({
          ..._.get(
            patientAnswersMedications,
            `medications[${medicationIndex}]`,
            {}
          ),
          [key]: value,
        })
        .concat(
          _.get(patientAnswersMedications, "medications", []).slice(
            medicationIndex + 1
          )
        ),
    });

  return (
    <FormContainer
      title="Medical History"
      formComponents={
        <div className="flex flex-col">
          <div className="flex flex-col" style={{ flex: 1, flexWrap: "wrap" }}>
            <div className="flex flex-col" style={{ marginBottom: "0.5em" }}>
              <span style={{ fontSize: "0.8em", marginBottom: "0.5em" }}>
                (Please check or list any medical problems you have experienced)
              </span>
              <div
                className="flex"
                style={{
                  flexWrap: "wrap",
                  width: "100%",
                  margin: "0 auto 0 auto",
                }}
              >
                {conditions.map((r) => {
                  const value = _.get(
                    patientAnswersConditions.conditions,
                    r.code,
                    false // default to not selected
                  );

                  return (
                    <Checkbox
                      key={r.code}
                      title={r.display}
                      checked={!!value}
                      onChange={() => setConditionValue(r.code, !value)}
                      style={{ ...checkboxStyle }}
                    />
                  );
                })}
              </div>
            </div>
            <Medications
              setMedicationValue={setMedicationValue}
              patientMedications={_.get(
                patientAnswersMedications,
                "medications",
                []
              )}
            />
            <div
              className="flex"
              style={{ flexWrap: "wrap", marginBottom: "0.5em" }}
            >
              <MedicationAllergies />
              <SurgicalHistory
                patientAnswersSurgical={patientAnswersSurgical}
              />
            </div>
            <HealthHabits />
            <FamilyMedicalHistory
              medicalHistory={
                patientAnswersFamMedicalHistory.familyMedicalHistory || []
              }
            />
          </div>
          <Button
            style={{ margin: "1em auto auto 0", width: "10em" }}
            text={isSubmitted ? "Saved" : "Submit"}
            disabled={isLoading || isSubmitted}
            onClick={() => {
              setLoading(true);
              /**
               * first update conditions
               */
              const conditionPayload = Object.keys(
                patientAnswersConditions.conditions
              )
                .filter(
                  (k) =>
                    patientAnswersConditions.conditions[k] && conditionByCode[k]
                )
                .map((code) => ({
                  code,
                  display: conditionByCode[code].display,
                }));

              savePatientData({
                endpoint: `conditions/${selectedPatientId}`,
                patientId: selectedPatientId,
                asArray: true,
                data: conditionPayload,
              });

              setLoading(false);
              setIsSubmitted(true);
            }}
          />
        </div>
      }
    />
  );
};

MedicalHistory.propTypes = {
  selectedPatientId: PropTypes.string.isRequired,
};

export default MedicalHistory;
