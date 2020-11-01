const BASE_URL = "/pre-populated-intake-forms-app-backend/api";

export const loadPatientById = ({
  patientId,
  setData,
  setError = null,
  setLoading = null,
}) => {
  if (setLoading) {
    setLoading(true);
  }

  fetch(`${BASE_URL}/patient/${patientId}`)
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
