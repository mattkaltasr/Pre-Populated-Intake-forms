const DEV_MODE = false;

const BASE_URL = DEV_MODE
  ? "http://127.0.0.1:8086/api"
  : "/pre-populated-intake-forms-app-backend/api";

export const loadPatientInfoById = ({
  patientId,
  setData,
  endpoint = "patient",
  setError = null,
  setLoading = null,
}) => {
  if (setLoading) {
    setLoading(true);
  }

  fetch(`${BASE_URL}/${endpoint}/${patientId}`)
    .then((res) => res.json())
    .then(
      (result) => {
        setData(result);
        if (setLoading) {
          setLoading(false);
        }
      },
      (error) => {
        if (setError) {
          setError(error);
        }
        if (setLoading) {
          setLoading(false);
        }
      }
    );
};

export const loadPatientList = ({
  setData,
  setError = null,
  setLoading = null,
}) => {
  if (setLoading) {
    setLoading(true);
  }

  fetch(`${BASE_URL}/patients`)
    .then((res) => res.json())
    .then(
      (result) => {
        setData(result);
        if (setLoading) {
          setLoading(false);
        }
      },
      (error) => {
        if (setError) {
          setError(error);
        }
        if (setLoading) {
          setLoading(false);
        }
      }
    );
};

export const savePatientData = ({
  patientId,
  data,
  endpoint = "patient/save",
  method = "PUT",
}) => {
  fetch(`${BASE_URL}/${endpoint}`, {
    method,
    body: JSON.stringify({ ...data, id: patientId }),
    headers: new Headers({
      "content-type": "application/json",
    }),
  });
};
