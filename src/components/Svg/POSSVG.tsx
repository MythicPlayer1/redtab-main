interface OrdersSVGProps {
  color?: string; // Tailwind color class or hex color
}

const POSSVG: React.FC<OrdersSVGProps> = () => {
  return (
    <>
      <div className="w-6 h-6 flex justify-center ">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4 9H10V12H4V9ZM4 16H6V14H4V16ZM8 16H10V14H8V16ZM4 20H6V18H4V20ZM8 20H10V18H8V20ZM24 6.5V18.594L20.874 16.694L18 18.501L16 17.244V14.812L18 16.066L20.801 14.31L22 15.039V6.5C22 4.019 19.981 2 17.5 2C15.246 2 13.391 3.671 13.067 5.836C13.639 6.383 14 7.148 14 8V24H0V8C0 6.895 0.608 5.938 1.5 5.417V5C1.5 2.243 3.743 0 6.5 0H17.5C21.084 0 24 2.916 24 6.5ZM12 8C12 7.448 11.552 7 11 7H3C2.448 7 2 7.448 2 8V22H12V8ZM11.177 5.018C11.448 3.864 12.025 2.827 12.82 2H6.499C4.845 2 3.499 3.346 3.499 5H10.999C11.06 5 11.116 5.014 11.176 5.018H11.177Z"
            fill="white"
          />
        </svg>
      </div>
    </>
  );
};

export default POSSVG;