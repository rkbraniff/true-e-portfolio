import { NavLink } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const navItems = [
    { name: "Home", to: "/" },
    { name: "Projects", to: "/projects" },
    { name: "Contact", to: "/contact" },
  ];

  return (
    <Disclosure as="nav" className="bg-gray-900 text-white">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto-px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex-shrink-0 text-xl font-bold text-emerald-400">
                🧪 E-Portfolio
              </div>
              {/* Desktop Links */}
              <div className="hidden sm:flex space-x-6">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.to}
                    className={({ isActive }) =>
                      isActive
                        ? "text-amber-400 font-semibold"
                        : "text-gray-300 hover:text-white"
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <div className="sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hoverbg-gray-700 focus:outline-none">
                  {open ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile Panel */}
          <Disclosure.Panel className="sm:hidden px-4 pb-4">
            <div className="space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.to}
                  className={({ isActive }) =>
                    isActive
                      ? "block text-amber-400 font-semibold"
                      : "block text-gray-300 hover:text-white"
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
