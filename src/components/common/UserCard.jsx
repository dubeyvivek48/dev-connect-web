export default function UserCard({
  photoUrl,
  firstName,
  lastName,
  about,
  skills,
  age,
  gender,

  actionsButtons = [],
}) {
  return (
    <div className="card w-full max-w-3xl mx-auto rounded-2xl shadow-lg border border-base-300 bg-gradient-to-br from-base-100 to-base-200 overflow-hidden my-3">
      <div className="flex size-full">
        {/* LEFT SIDE IMAGE */}
        <div className="w-2/5">
          <img
            src={photoUrl}
            alt={firstName + " " + lastName}
            className="h-full w-full object-cover rounded-l-2xl"
          />
        </div>

        {/* RIGHT SIDE CONTENT */}
        <div className="w-3/5 p-6 flex flex-col">
          {/* Name */}
          <h2 className="text-2xl font-bold capitalize text-base-content mb-2">
            {firstName} {lastName}
          </h2>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {skills?.map((skill, idx) => (
              <span
                key={idx}
                className="badge bg-base-100 border border-primary/40 text-primary px-3 py-2 shadow-sm"
              >
                {skill.charAt(0).toUpperCase() + skill.slice(1)}
              </span>
            ))}
          </div>

          {/* About */}
          <p className="text-sm opacity-80 mb-4 leading-relaxed">{about}</p>

          {/* Age + Gender */}
          <div className="flex gap-3 mb-5">
            <span className="badge bg-blue-100 text-blue-600 border-none px-3 py-2">
              Age: {age}
            </span>
            <span className="badge bg-pink-100 text-pink-600 border-none px-3 py-2 capitalize">
              {gender}
            </span>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-auto">
            {actionsButtons.map(({ label, className, callBack }) => (
              <button key={label} onClick={callBack} className={className}>
                {label}
              </button>
            ))}
            {/* <button className="btn btn-primary w-1/2 rounded-lg font-medium">
              View Profile
            </button>
            <button className="btn btn-outline w-1/2 rounded-lg font-medium">
              Message
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
