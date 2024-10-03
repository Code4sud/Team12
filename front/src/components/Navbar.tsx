"use client";

export const Navbar = () => {
  return (
    <div className="w-full">
      <nav className="container relative flex flex-wrap items-center justify-between p-4 mx-auto lg:justify-between xl:px-1">
        <span className="flex items-center space-x-2 text-2xl font-medium text-green-600 dark:text-gray-100">
            <span>
              <img
                src="/img/logo.svg"
                width="32"
                alt="N"
                height="32"
                className="w-8"
              />
            </span>
          <span className="m-4">Sairch</span>
        </span>
      </nav>
    </div>
  );
}

