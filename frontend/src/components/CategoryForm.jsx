const CategoryForm = ({
  value,
  setValue,
  buttonText = "Submit",
  handleSubmit,
  handleDelete,
}) => {
  return (
    <div className="p-3">
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          placeholder="Enter Category Name"
          className="px-4 text-[13px] py-2 outline-0 border border-gray-700 text-gray-500 rounded-lg w-full"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <div className="flex justify-between">
          <button className="bg-black text-white font-medium  px-2 py-1 rounded cursor-pointer my-4 outline-0 text-[12px]">
            {buttonText}
          </button>

          {handleDelete && (
            <button
              onClick={handleDelete}
              type="button"
              className="bg-black text-white font-medium  px-3 py-1 rounded cursor-pointer my-4 outline-0 text-[12px]"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
