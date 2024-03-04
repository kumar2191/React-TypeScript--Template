import { stats } from "../constants/adminStats";
import { useUserContext } from "../context/userAuth.Context";

const Card = ({ title, description }) => {
  return (
    <div className="border rounded-lg border-gray-300 p-3 w-60 flex flex-col gap-3">
      <p className="font-semibold text-xs text-gray-500">{title} :</p>
      <p className="font-bold text-xl text-black">{description}</p>
    </div>
  );
};

const Admin = () => {
  const { user } = useUserContext();

  return (
    <div className="m-[1rem]">
      <div className="border rounded-xl border-gray-300 h-screen">
        <div className="py-2 px-5 flex flex-col gap-2">
          <h2 className="font-bold text-[24px] underline underline-offset-8">
            Welcome Back {user.username} !
          </h2>
          <span className="font-semibold text-xs text-gray-500">Admin</span>
        </div>
        {/* stats */}
        <div className="flex justify-between gap-2 m-5">
          {stats.map((items) => {
            const { id, title, description } = items;
            return <Card key={id} title={title} description={description} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Admin;
