import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";


function Github() {
 
  const data = useLoaderData()
  console.log(data)
  
//   const [data, setData] = useState([]);
//   useEffect(() => {
//     fetch("https://api.github.com/users/halilkrkn")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         setData(data);
//       });
//   }, []);

  return (
    <div className="text-center m-4 bg-gray-700 text-white p-4 text-3xl">
        Github Profile
      <div className="pt-5">
      Github Followers: {data.followers}
      </div>
      <div>
      Github Following: {data.following}
      </div>
      <img src= {data.avatar_url} width={400} alt="Github Profile Image" className="rounded-full" />
    </div>
  );
}

export default Github;


// useEffect ve useState kullanımının yanında bu yöntemde kullanılır.
// Bu yöntem api/internetten gelen veriyi ön belleğe alıyor. 
// Bu şekilde yüklemede sorunlar olmuyor.
// githubInfoLoader'ı main.jsx içerisinde Github Route'ına loader olarak ekledik.
// Sonrada useLoaderData ile apiden gelen datayı const bir değer olan data ya atadık.
// Bundan sonraki süreç useState ve useEffect kullanımı ile aynı data ile verilere erişip gösterdik.
export const githubInfoLoader = async () => {
    const response = await fetch('https://api.github.com/users/halilkrkn')
    return response.json()

}
