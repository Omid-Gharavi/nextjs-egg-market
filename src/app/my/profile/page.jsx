'use client'

import Checkbox from "@/components/UI/Checkbox"
import { useProfileState } from "@/store/profileState"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ProfilePage() {
    const router = useRouter()
    const [checks, setChecks] = useState([false, false, false, false, false, false])

    // Activity options
    const lists = [
        { title: 'مرغدار' },
        { title: 'بنکدار' },
        { title: 'پخش' },
        { title: 'بسته‌بندی' },
        { title: 'صادرات' },
        { title: 'فروشگاه' },
    ]

    // Access fields and actions from the Zustand store
    const fields = useProfileState(state => state.fields)
    const addFields = useProfileState(state => state.addFields)


    return (
        <div className="p-8">
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => router.back()}>
                <span className="icon-light-bold-Right-1 text-default-900 text-2xl"></span>
                <p className="text-default-900 font-semibold text-xl">پروفایل</p>
            </div>
            <div className="mt-10 text-default-700 font-medium">
                <p>زمینه فعالیت<span className="text-xs font-normal"> (می‌توانید چند گزینه انتخاب کنید)</span></p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-x-20 gap-y-6">
                {
                    lists.map((data, index) => (
                        <Checkbox
                            key={index}
                            hasLine={false}
                            data={data}
                            onChange={() => {
                                addFields('Hi')
                                setChecks(prev => {
                                    const updatedChecks = [...prev]
                                    updatedChecks[index] = !updatedChecks[index]
                                    return updatedChecks
                                })
                            }}
                            checked={checks[index]}
                        />
                    ))
                }
            </div>

            <div className="mt-6">
                <h3>Selected Fields:</h3>
                {fields.length > 0 ? (
                    <ul>
                        {fields.map((value, index) => (
                            <li key={index}>{value}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No fields selected.</p>
                )}
            </div>
        </div>
    )
}
