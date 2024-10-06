"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const lists = [
    {
      icon: "icon-light-linear-Message-35",
      text: "پیام‌ها",
      href: "messages",
    },
    {
      icon: "icon-icon-my-ads-1",
      text: "آگهی های من",
      href: "ads",
    },
    {
      icon: "icon-light-linear-Chart",
      text: "معاملات من",
      href: "trades",
    },
    {
      icon: "icon-light-outline-Refresh-1",
      text: "گردش حساب",
      href: "transactions",
    },
    {
      icon: "icon-light-linear-Password-1",
      text: "امنیت",
      href: "/security",
    },
    {
      icon: "icon-icon-avout-us-1",
      text: "درباره اگمارکت",
      href: "aboutUs",
    },
    {
      icon: "icon-icon---Terms-of-use-1",
      text: "شرایط استفاده",
      href: "policy",
    },
    {
      icon: "icon-light-linear-Logout-danger",
      text: "خروج",
      href: "/",
    },
  ];

  const router = useRouter();
  const [profile, setProfile] = useState({});
  const [token, setToken] = useState("");

  const saveProfileToLocalStorage = (profileData) => {
    localStorage.setItem("profile", JSON.stringify(profileData));
  };

  const loadProfileFromLocalStorage = () => {
    const storedProfile = localStorage.getItem("profile");
    return storedProfile ? JSON.parse(storedProfile) : null;
  };

  useEffect(() => {
    // const storedToken = localStorage.getItem("token");
    setProfile(JSON.parse(localStorage.getItem('profile')))
    if (!profile || !token) {
      const getToken = async () => {
        try {
          const data = await (await fetch(`http://localhost:3000/api/token`, { cache: "force-cache" })).json()
          setToken(data);
        } catch (err) { console.error(err) }
      }
      getToken()
      const getData = async () => {
        const storedProfile = loadProfileFromLocalStorage();
        if (storedProfile) {
          setProfile(storedProfile);
        } else if (token && !profile) {
          try {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_EGG_MARKET}/API/customers/profile`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: token,
                },
                cache: "force-cache",
              }
            );
            const data = await res.json();
            setProfile(data.profile);
            saveProfileToLocalStorage(data.profile);
          } catch (err) {
            console.error("Failed to fetch profile data:", err);
          }
        }
      };
      getData();
    }
  }, [token, profile]);
  useEffect(() => {
    sessionStorage.clear('current-password')
  }, [])
  return (
    // <div className="p-4 flex flex-col items-center max-w-full w-[440px]">
    //     <div className="max-w-[380px]">
    //         <div className="h-[132px] border-solid border-[2px] border-default-400 rounded-xl flex flex-col overflow-hidden">
    //             <div className="h-[73px] pr-3 pl-2 flex items-center justify-between bg-secondary">
    //                 <div className="flex items-center gap-3">
    //                     <span className="icon-light-bold-Profile-Octagon text-[32px]"></span>
    //                     <div>
    //                         <p className="font-semibold">مهدی قمی پور</p>
    //                         <p className="text-default-700 font-normal text-xs mt-1">
    //                             {
    //                                 ["مرغدار", "بنکدار"].join(' - ')
    //                             }
    //                         </p>
    //                     </div>
    //                 </div>
    //                 <span className="icon-light-linear-Left-2 text-2xl"></span>
    //             </div>
    //             <div className="mt-auto py-3 pr-3 pl-2 flex items-center justify-between bg-default-100">
    //                 <div className="flex items-center gap-3">
    //                     <span className="icon-light-outline-Wallet text-2xl"></span>
    //                     <p className="text-default-700">کیف پول</p>
    //                 </div>
    //                 <div className="flex items-center gap-3">
    //                     <p className="text-xl font-semibold text-default-900">۴۵۰.۰۰۰.۰۰۰ <span className="text-default-700 text-xs font-normal">تومان</span></p>
    //                     <span className="icon-light-linear-Left-2 text-2xl"></span>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    //     <ul className="max-w-[380px] mt-4 flex flex-col gap-2">
    //         {
    //             lists.map((list, index) => (
    //                 <li className="px-2 rounded-md h-11 flex items-center hover:bg-[#FF79011A] cursor-pointer">
    //                     <span className={`${list.icon} text-2xl text-default-700`}></span>
    //                     <p className="mr-3 font-medium text-default-700">{list.text}</p>
    //                     {index < lists.length - 1 && <span className="mr-auto icon-light-linear-Left-2 text-2xl"></span>}
    //                 </li>
    //             ))
    //         }
    //     </ul>
    // </div>
    <div className="p-4 flex flex-col items-center max-w-full w-[440px]">
      <div className="w-full">
        <div className="h-[132px] border-solid border-[2px] border-default-400 rounded-xl flex flex-col overflow-hidden">
          <div className="h-[73px] pr-3 pl-2 flex items-center justify-between bg-secondary">
            <div className="flex items-center gap-3">
              <span className="icon-light-bold-Profile-Octagon text-[32px]"></span>
              <div>
                <p className="font-semibold text-default-900">
                  {profile?.name ?? 'درحال بارگذاری...'}
                </p>
                <p className="text-default-700 font-normal text-xs mt-1">
                  {["مرغدار", "بنکدار"].join(" - ")}
                </p>
              </div>
            </div >
            <span className="icon-light-linear-Left-2 text-2xl"></span>
          </div >
          <div className="mt-auto py-3 pr-3 pl-2 flex items-center justify-between bg-default-100">
            <div className="flex items-center gap-3">
              <span className="icon-light-outline-Wallet text-2xl"></span>
              <p className="text-default-700">کیف پول</p>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-xl font-semibold text-default-900">
                ۴۵۰.۰۰۰.۰۰۰{" "}
                <span className="text-default-700 text-xs font-normal">
                  تومان
                </span>
              </p>
              <span className="icon-light-linear-Left-2 text-2xl"></span>
            </div>
          </div>
        </div >
      </div >
      <ul className="w-full mt-4 flex flex-col gap-2">
        {lists.map((list, index) => (
          <Link
            href={list.href === "/" ? "#" : `/my/${list.href}`}
            key={index + 1}
            className="px-2 rounded-md h-11 flex items-center hover:bg-[#FF79011A] cursor-pointer"
            onClick={async () => {
              if (list.href === "/") {
                localStorage.clear('profile')
                try {
                  const res = await fetch(
                    `${process.env.NEXT_PUBLIC_EGG_MARKET}/API/customers/logout`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                      },
                      body: JSON.stringify({ token }),
                    }
                  );
                  console.log(res.status);
                  try { await fetch(`http://localhost:3000/api/token`, { method: 'DELETE' }) } catch (err) { console.error(err) }
                  router.push("/");
                } catch (err) {
                  console.error(err);
                }
              }
            }}
          >
            <span className={`${list.icon} text-2xl text-default-700`}></span>
            <p className="mr-3 font-medium text-default-700">{list.text}</p>
            {index < lists.length - 1 && (
              <span className="mr-auto icon-light-linear-Left-2 text-2xl"></span>
            )}
          </Link>
        ))}
      </ul>
    </div >
  );
}

