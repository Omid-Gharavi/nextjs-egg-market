import { create } from "zustand"
import { persist, createJSONStorage } from 'zustand/middleware'

export const useProfileState = create(
    persist(
        (get, set) => ({
            fields: '',
            addFields: (payload) => set(state => {
                console.log("Adding field:", payload) // Add this
                return {
                    fields: state.fields.includes(payload)
                        ? state.fields
                        : [...state.fields, payload]
                }
            }),

        }),
        {
            name: 'fields',
            storage: createJSONStorage(() => localStorage),
        }
    )
)
