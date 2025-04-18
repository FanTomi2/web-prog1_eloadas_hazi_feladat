import React, { useState } from "react";

const JeszoGenerator = () => {
  const karakterek = "qwertzuiopasdfghjklyxcvbnmQWERTZUIOPASDFGHJKLYXCVBNM0123456789!%?_";
  const [jelszo, setJelszo] = useState("");
  const [jelszok, setJelszavak] = useState([]);
  const generateJeszo = async () => {
    const randomHossz = Math.floor(Math.random() * (30 - 10 + 1)) + 10;
    let str = "";
    for (let i = 0; i < randomHossz; i++) {
      let rndSzam = Math.floor(Math.random() * karakterek.length);
      str += karakterek[rndSzam];
    }
    const newId = jelszok.length + 1;
    setJelszo(str);
    setJelszavak([...jelszok, { id: newId, jelszo: str }]);
  };

  const removeJelszo = (index) => {
    setJelszavak(jelszok.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-3xl font-bold mb-4">Jelszógenerátor</h2>
      <button
        onClick={generateJeszo}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl shadow-md mb-4"
      >
        Kérj jelszót!
      </button>
      {jelszo && (
        <div className="text-xl font-medium text-gray-800">{jelszo}</div>
      )}
      <table className="table-auto border-collapse border border-black-400 w-96 text-center">
        <thead>
          <tr className="hover:bg-gray-100">
            <th className="border border-gray-400 px-4 py-2">ID</th>
            <th className="border border-gray-400 px-4 py-2">jelszavak</th>
            <th className="border border-gray-400 px-4 py-2">törlés</th>
          </tr>
        </thead>
        <tbody>
          {
            jelszok.map((item, i) => (
              <tr key={i} className="hover:bg-gray-100">
                <td className="border border-gray-400 px-4 py-2">{item.id}</td>
                <td className="border border-gray-400 px-4 py-2">{item.jelszo}</td>
                <td className="border border-gray-400 px-4 py-2"><button onClick={() => removeJelszo(i)} className="text-red-500 hover:text-red-700">❌</button></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default JeszoGenerator;