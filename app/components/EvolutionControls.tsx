const EvolutionControls = ({ onStartEvolution }) => {
  return (
    <div className="mt-5">
      <button
        onClick={onStartEvolution}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Start Evolution
      </button>
    </div>
  )
}

export default EvolutionControls

