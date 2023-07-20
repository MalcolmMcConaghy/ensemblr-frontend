export default function OrganizationCard({
  name,
  members,
  userEmail,
}: {
  name: string;
  members: number;
  userEmail: string;
}) {
  return (
    <div className="flex flex-col space-y-2 rounded p-6 shadow-xl">
      <div className="text-xl font-semibold">
        {name} - {members} members
      </div>
      <div>{userEmail}</div>
    </div>
  );
}
