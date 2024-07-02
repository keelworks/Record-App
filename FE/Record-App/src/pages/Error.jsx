import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  if (error.status === 404) {
    return (
      <div className="w-screen h-screen bg-grey300 flex justify-center items-center">
        <div className="w-screen h-1/3 flex flex-col justify-center items-center bg-white">
          <h3 className="text-primary500 text-[2rem] md:text-[5rem] font-semibold">
            Not Found!
          </h3>
          <p className="text-fontPrimary text-[1rem] md:text-[1.6rem] pb-5 mt-10">
            The page you are looking for does not exist.
          </p>
          <Link
            to="/"
            className="w-[100px] h-[47px] border-primary500 border-solid border-[4px] rounded-full flex justify-center items-center hover:bg-primary300 transition duration-[100ms] ease-linear text-primary500 hover:text-fontSecondary font-semibold"
          >
            Home
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="w-screen h-screen bg-grey300 flex justify-center items-center">
      <div className="w-screen h-1/3 flex flex-col justify-center items-center bg-white">
        <h3 className="text-primary500 text-[2rem] md:text-[5rem] font-semibold">
          Error!
        </h3>
        <p className="text-fontPrimary text-[1rem] md:text-[1.6rem] pb-5">
          Sorry, something went wrong!
        </p>
        <Link
          to="/"
          className="w-[100px] h-[47px] border-primary500 border-solid border-[4px] rounded-full flex justify-center items-center hover:bg-primary300 transition duration-[100ms] ease-linear text-primary500 hover:text-fontSecondary font-semibold"
        >
          Home
        </Link>
      </div>
    </div>
  );
};
export default Error;
