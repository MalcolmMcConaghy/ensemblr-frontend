import { useContext } from "react";
import { useQuery } from "react-query";
import { UserContext, UserContextType } from "../context/UserContext";
import LoginWall from "../components/organisms/loginWall";
import OrganizationCard from "../components/molecules/organizationCard";

export default function Home() {
  const { user } = useContext(UserContext) as UserContextType;

  if (!user) return <LoginWall />;

  return (
    <>
      <div className="text-black text-2xl font-semibold">
        Welcome back, {user.name}
      </div>
      <OrganizationCard
        name="FeelsGoodMan Inc"
        members={87}
        userEmail="malcolm@feelsgoodman.inc"
      />
    </>
  );
}
