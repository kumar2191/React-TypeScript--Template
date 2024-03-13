import { stats } from "../constants/adminStats";
import { useUserContext } from "../context/userAuth.Context";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { useAdminContext } from "../context/admin.Context";
import { Card } from "primereact/card";

const StatCard = ({ title, description }) => {
  return (
    <div className="border rounded-lg border-gray-300 p-3 w-60 flex flex-col gap-2">
      <p className="font-bold text-[14px] text-indigo-500">{title} :</p>
      <p className="font-bold text-lg text-black">{description}</p>
    </div>
  );
};

const Admin = () => {
  const { user } = useUserContext();
  const { users } = useAdminContext();

  return (
    <div className="m-[1rem]">
      <div className="border rounded-xl border-gray-300">
        <div className="py-5 px-5 flex flex-col gap-2">
          <h2 className="font-bold text-[24px] underline underline-offset-8">
            Welcome Back{" "}
            <span className="text-indigo-500">{user.name}</span> !
          </h2>
          <Tag
            className="font-semibold text-xs text-white w-[75px] bg-indigo-500"
            value="Admin"
            rounded
          ></Tag>
        </div>
        {/* stats */}
        <div className="flex justify-between gap-2 py-4 px-5">
          {stats.map((items) => {
            const { id, title, description } = items;
            return (
              <StatCard key={id} title={title} description={description} />
            );
          })}
        </div>

        <div className="py-5 px-5">
          <Card>
            <h2 className="pb-5 font-bold text-[16px] text-indigo-500 underline underline-offset-8">
              User details:
            </h2>
            <div className="card">
              <DataTable
                tableStyle={{ minWidth: "50rem" }}
                value={users}
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 25, 50]}
                className="text-[15px]"
              >
                <Column field="username" header="Username"></Column>
                <Column field="email" header="Email"></Column>
                <Column field="createdAt" header="Date OJ"></Column>
              </DataTable>
            </div>
            <hr className="my-5" />
            <p className="text-end text-[14px]">
              Note: Admin cannot modify users values.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;
