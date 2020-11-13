import React from "react";
import PropTypes from "prop-types";

import FormContainer from "../containers/FormContainer";
import TextInput from "../formElements/TextInput";
import RadioButtonGroup from "../formElements/RadioButtonGroup";
import DateField from "../formElements/DateField";
import PhoneInput from "../formElements/PhoneInput";

const PatientInfo = ({ patientData }) => {
  const [patientAnswers, setAnswers] = React.useState({ ...patientData });

  React.useEffect(() => {
    setAnswers({ ...patientData });
  }, [patientData]);

  const setFieldValue = (key, value) =>
    setAnswers({ ...patientAnswers, [key]: value });

  return (
    <FormContainer
      title="Patient Info"
      key="form-group-0"
      formComponents={
        <div className="flex" style={{ flex: 1, flexWrap: "wrap" }}>
          <div className="flex flex-col" style={{ flex: 1 }}>
            <div className="flex" style={{ flexWrap: "wrap" }}>
              <TextInput
                placeholder="name"
                title="First"
                isRequired
                grow
                onChange={(v) => setFieldValue("firstName", v)}
                value={patientAnswers.firstName}
                valueDiffers={
                  patientAnswers.firstName !== patientData.firstName
                }
              />
              <TextInput
                placeholder="initial"
                title="Middle"
                isRequired
                small
                grow
                onChange={(v) => setFieldValue("middleInitial", v)}
                value={patientAnswers.middleInitial}
              />
              <TextInput
                placeholder="name"
                title="Last"
                isRequired
                grow
                onChange={(v) => setFieldValue("lastName", v)}
                value={patientAnswers.lastName}
                valueDiffers={patientAnswers.lastName !== patientData.lastName}
              />
            </div>
            <div className="flex">
              <TextInput
                title="Address"
                isRequired
                grow
                onChange={(value) => setFieldValue("address", value)}
                value={patientAnswers.address}
                valueDiffers={patientAnswers.address !== patientData.address}
              />
            </div>
            <div className="flex" style={{ flexWrap: "wrap" }}>
              <TextInput
                title="City"
                onChange={(value) => setFieldValue("city", value)}
                value={patientAnswers.city}
                grow
              />
              <TextInput
                title="State"
                onChange={(value) => setFieldValue("state", value)}
                value={patientAnswers.state}
                grow
                small
              />
              <TextInput
                title="Postal Code"
                onChange={(value) => setFieldValue("postalCode", value)}
                value={patientAnswers.postalCode}
                grow
                small
              />
            </div>
            <div className="flex">
              <DateField
                title="Date of Birth"
                value={patientAnswers.birthDate}
                onChange={(date) => setFieldValue("birthDate", date)}
              />
              <RadioButtonGroup
                title="Gender"
                onChange={(v) => setFieldValue("gender", v)}
                isRequired
                value={patientAnswers.gender || ""}
                valueDiffers={patientAnswers.gender !== patientData.gender}
                options={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                ]}
              />
            </div>
          </div>
          <div className="flex flex-col" style={{ flex: 1, flexWrap: "wrap" }}>
            <div className="flex" style={{ flexWrap: "wrap" }}>
              <RadioButtonGroup
                title="Relationship Status"
                onChange={(v) => setFieldValue("relationshipStatus", v)}
                options={[
                  {
                    label: "Single",
                    value: "single",
                    /** hook to provide "fuzzy" text matching.
                     * this is slightly hacky, and I couldn't find
                     * an enum of all legal FHIR values for relationshipStatus.
                     * All choices here will probably need aliasValues
                     */
                    aliasValues: new Set(["Never Married"]),
                  },
                  {
                    label: "Married",
                    value: "married",
                  },
                  {
                    label: "Divorced",
                    value: "divorced",
                  },
                  {
                    label: "Widowed",
                    value: "widowed",
                  },
                  {
                    label: "Other",
                    value: "other",
                  },
                ]}
                value={patientAnswers.relationshipStatus || ""}
              />
              <PhoneInput
                placeholder="initial"
                title="Phone (Home)"
                grow
                onChange={(value) => setFieldValue("homePhone", value)}
                value={patientAnswers.homePhone}
              />
            </div>
            <div className="flex" style={{ flexWrap: "wrap" }}>
              <PhoneInput
                title="Phone (Mobile)"
                onChange={(value) => setFieldValue("mobilePhone", value)}
                value={patientAnswers.mobilePhone}
                grow
              />
              <TextInput
                title="Email"
                onChange={(value) => setFieldValue("email", value)}
                value={patientAnswers.email}
                grow
              />
              <TextInput
                title="Preferred Contact"
                onChange={(value) => setFieldValue("preferredContact", value)}
                value={patientAnswers.preferredContact}
                grow
              />
            </div>
          </div>
        </div>
      }
    />
  );
};

PatientInfo.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  patientData: PropTypes.object.isRequired,
};

export default PatientInfo;
