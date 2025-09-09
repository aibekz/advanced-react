import AutocompleteGithub from './explorations/AutocompleteGithub';
import SuspenseDemo from './explorations/SuspenseDemo';

function App() {
  const handleSelect = (username) => {
    alert(`Selected GitHub user: ${username}`);
  };
  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-12 px-4">
      <div>
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 mb-4">
          <h1 className="text-2xl font-semibold text-gray-800 ">Welcome to Advanced React</h1>
          <p className="text-sm text-gray-500">Experiment area for advanced React patterns</p>
        </div>
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 mb-4">
          <AutocompleteGithub onSelectItem={handleSelect} />
        </div>
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 mb-4">
          <SuspenseDemo />
        </div>
      </div>
    </div>
  );
}

export default App
