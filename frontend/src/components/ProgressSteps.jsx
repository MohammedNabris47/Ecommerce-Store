const ProgressSteps = ({ step1, step2, step3 }) => {
  return (
    <div className="flex items-center justify-center space-x-4">
      <div className={`${step1 ? "text-green-500" : "text-gray-300"} l`}>
        <span className="ml-2 text-[12px]">Login</span>
        <div className="mt-1 text-[12px] text-center">✅</div>
      </div>

      {step2 && (
        <>
          {step1 && <div className="h-0.5 w-32  bg-green-500"></div>}
          <div className={`${step1 ? "text-green-500" : "text-gray-300"}`}>
            <span className="  text-[12px]">Shipping</span>
            <div className="mt-1 text-[12px] text-center">✅</div>
          </div>
        </>
      )}

      <>
        {step1 && step2 && step3 ? (
          <div className="h-0.5 w-32 bg-green-500"></div>
        ) : (
          ""
        )}

        <div className={`${step3 ? "text-green-500" : "text-gray-300"}`}>
          <span className={`${!step3 ? "ml-32" : ""}  text-[12px]`}>
            Summary
          </span>
          {step1 && step2 && step3 ? (
            <div className="mt-1 text-[12px] text-center">✅</div>
          ) : (
            " "
          )}
        </div>
      </>
    </div>
  );
};

export default ProgressSteps;
