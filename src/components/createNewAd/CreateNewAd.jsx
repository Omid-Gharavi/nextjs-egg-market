import React, { useEffect, useState } from "react";
import ScrollBar from "../UI/ScrollBar";
import {
  PrintOptions,
  QualityOptions,
  YolkOptions,
  PackOptions,
} from "../static";
import { useForm } from "react-hook-form";
import InputText from "../UI/InputText";
import InputSelect from "../UI/InputSelect";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CreateNewAd({ profile }) {
  const router = useRouter();
  const [isDescOpen, setIsDescOpen] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { isValid, isDirty },
  } = useForm({
    defaultValues: {
      origin: "",
      yolk_type: "",
      weight: "",
      quality: "",
      pack_type: "",
      price: "",
      count: "",
      description: "",
      print_type: "",
    },
  });

  useEffect(() => {
    async function getProvinces() {
      await axios
        .get(`${process.env.NEXT_PUBLIC_EGG_MARKET}/API/locations/provinces`)
        .then((response) => {
          setProvinces(response.data.provinces);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getProvinces();
  }, []);

  const weight = register("weight", { required: true });
  const count = register("count", { required: true });
  const price = register("price", { required: false });
  const description = register("description", { required: false });

  const onSubmit = (data) => {
    setIsLoading(true);
    const postData = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_EGG_MARKET}/API/loads/add`,
          {
            client: "web",
            origin_field1: data.origin.id,
            origin_field2: data.origin.title,
            weight: data.weight,
            count: data.count,
            print_type: data.print_type,
            yolk_type: data.yolk_type,
            box_type: "تست", // string
            stage_type: "تست", // string
            type: "announcement",
            pack_type: "bulk",
            quality: data.quality,
            price: data.price, // string
            description: data.description, // string
            person_owner_name: "محمد رضا محمدی تست", // string
            owner_name: "تست", // string
            phones: [null],
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        if (response.status === 200) {
          setIsLoading(false);
          reset();
          document.getElementById("adModal").close();
          router.push("/");
          router.refresh();
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    postData();
  };

  return (
    <div className="bg-surface-secondary">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ScrollBar>
          <div className="grid grid-cols-2 grid-row-6 gap-x-6 gap-y-4">
            <InputText
              name={weight.name}
              onChange={weight.onChange}
              inputRef={weight.ref}
              label="وزن کارتن"
              smallText="(کیلوگرم)"
              required={true}
              placeholder="مثلا ۱۲.۵"
              space="col-span-1"
            />
            <InputText
              name={count.name}
              onChange={count.onChange}
              inputRef={count.ref}
              label="تعداد کارتن"
              smallText="(کیلوگرم)"
              required={true}
              placeholder="مثلا ۳۶۰"
              space="col-span-1"
            />
            {/* <InputText
            name={brand.name}
            onChange={brand.onChange}
            inputRef={brand.ref}
            label="برند"
            required={true}
            placeholder="مثلا چکاوک"
            space="col-span-1"
          /> */}
            <InputSelect
              name="pack_type"
              label="بسته بندی"
              options={PackOptions}
              register={register}
              setValue={setValue}
              isDirty={isDirty}
              defaultValue={getValues("pack_type")}
            />
            <InputSelect
              name="quality"
              label="کیفیت"
              options={QualityOptions}
              register={register}
              setValue={setValue}
              isDirty={isDirty}
              defaultValue={getValues("quality")}
            />
            <InputSelect
              name="print_type"
              label="پرینت"
              options={PrintOptions}
              register={register}
              setValue={setValue}
              isDirty={isDirty}
              defaultValue={getValues("print")}
            />
            <InputSelect
              name="yolk_type"
              label="نوع زرده"
              options={YolkOptions}
              register={register}
              setValue={setValue}
              isDirty={isDirty}
              defaultValue={getValues("yolk_type")}
            />
            <InputSelect
              name="origin"
              label="محل بارگیری"
              options={provinces}
              register={register}
              setValue={setValue}
              space="col-span-2"
              isDirty={isDirty}
              defaultValue={getValues("origin")}
              isSearch={true}
            />
            <InputText
              name={price.name}
              onChange={price.onChange}
              inputRef={price.ref}
              label="قیمت"
              smallText="(تومان)"
              required={false}
              placeholder="مثلا ۴۵,۰۰۰"
              space="col-span-2"
            />
            {isDescOpen ? (
              <InputText
                name={description.name}
                onChange={description.onChange}
                inputRef={description.ref}
                label="توضیحات"
                required={false}
                placeholder="توضیحات بیشتر مانند شرایط پرداخت، تعداد شکسته و..."
                space="col-span-2"
              />
            ) : (
              <button
                className="col-span-2 text-xs text-tertiary text-start"
                onClick={() => setIsDescOpen(true)}
              >
                افزودن توضیحات...
              </button>
            )}
          </div>
        </ScrollBar>
        <div className="px-8 py-3 mb-3 w-full bg-inherit">
          <button
            className={`button button-primary w-full ${
              isLoading ? "isLoading" : ""
            } ${isValid ? "" : "disabled"}`}
            disabled={!isValid ? true : isLoading ? true : false}
          >
            ثبت آگهی
          </button>
        </div>
      </form>
    </div>
  );
}
