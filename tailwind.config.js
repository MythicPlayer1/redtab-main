/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        colors: {
            primaryColor: "#EA4335",
            secondaryColor: "#F0F5F2",
            primaryColor2: "#EA4335",
            secondaryColor2: "#E6E8E9",
            primaryColorText: "#fff",
            secondaryColorText: "#F8453F",
            primaryIconsColor: "#F96A65",
            secondaryColorTextBtn: "#98a2b3",
            placeHolderTextColor: "#949caa",
            primarySecondColor: "#8c94a3",
            disabledColor: "#D0D5DD",
            disabledColorText: "#fff",
            disabledColor2: "#F2F4F7",
            disabledTextColor2: "#fff",
            while: "ffffff",
            textGreen: "#139855",
        },
        extend: {
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
                inter: ["Inter", "sans-serif"],
            },
        },
    },
    plugins: [],
};
