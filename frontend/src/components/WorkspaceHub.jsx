import Header from './Header.jsx'
import Footer from './Footer.jsx'
import CreateWorkspaceForm from './CreateWorkspaceForm.jsx'
import WorkspaceList from './WorkspaceList.jsx';

export default function WorkspaceHub() {
  const workspaces = [
    { id: 1, name: "Acme Corp", description: "Product development & marketing" },
    { id: 2, name: "Blue Ocean", description: "Client projects and delivery" },
    { id: 3, name: "Nova Team", description: "Internal tools & R&D" },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-100 p-6">
        <div className="flex justify-center items-center flex-col gap-4">
          <CreateWorkspaceForm />
          <WorkspaceList workspaces={workspaces} />
        </div>
      </div>
      <Footer />
    </>
  );
}