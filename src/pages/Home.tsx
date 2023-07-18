import { useQuery } from "react-query";

export default function Home() {
  // const fetchOrganization = async () => {
  //   const res = await fetch("http://localhost:3000/api/v1/organizations/2");

  //   return res.json();
  // };

  // const { isLoading, error, data } = useQuery<{ data: [{ name: string }] }>(
  //   "repoData",
  //   fetchOrganization
  // );

  // if (isLoading) return "Loading...";

  // if (error) return `An error has occurred: ${error.message}`;

  return (
    <>
      {/* {data?.data.map((organization) => {
        return (
          <h1 className="text-3xl font-bold underline text-blue-600">
            {organization.name}
          </h1>
        );
      })} */}
    </>
  );
}
