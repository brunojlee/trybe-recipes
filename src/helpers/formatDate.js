const formatDate = () => {
  const today = new Date(Date.now());
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  let dt = today.getDate();
  const ten = 10;

  if (dt < ten) {
    dt = `0${dt}`;
  }
  if (month < ten) {
    month = `0${month}`;
  }

  return `${dt}/${month}/${year}`;
};

export default formatDate;
