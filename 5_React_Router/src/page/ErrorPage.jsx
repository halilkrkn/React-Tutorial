import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <section className="page_404">
      <div className="mx-auto w-full max-w-7xl">
        <div className="row">
          <div className="col-sm-12 ">
            <div className="col-sm-10 col-sm-offset-1  text-center">
              <div className="four_zero_four_bg">
                <h1 className="text-center ">404</h1>
              </div>

              <div className="contant_box_404">
                <h3 className="text-lg">Look like you're lost</h3>
                <h3 className="text-lg">
                  the page you are looking for not avaible!
                </h3>

                <p className="mt-3">
                  <i className="contant_box_404 text-rose-600 text-2xl">
                    {error.statusText || error.message}
                  </i>
                </p>
                <Link to={"/"}>
                  <p className="link_404 rounded-md">Go to Home</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
