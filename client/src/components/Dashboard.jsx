import Header from "./Header";

const Dashboard = ({ user }) => {
  return (
    <>
      <Header user={user} />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
        <p className="mt-4">This is a simple dashboard layout</p>
      </div>
    </>
  );
};

export default Dashboard;
