import React from "react";

const UserCard = ({
  photoUrl,
  skills,
  about,
  firstName,
  lastName,
  age,
  gender,
}) => {
  return (
    <div className="card bg-base-100 w-96 shadow-md m-5">
      <figure>
        <img src={photoUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
        <p>{about}</p>
        <ul>
          <li>Age: {age || "NA"}</li>
          <li>Gender: {gender || "NA"}</li>
        </ul>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
