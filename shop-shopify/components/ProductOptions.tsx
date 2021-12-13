interface ProductOptionsProps {
  name: string;
  values: string[];
  selectedOptions: { [key: string]: string };
  setOptions: (name: string, value: string) => void;
}

const ProductOptions = ({
  name,
  values,
  selectedOptions,
  setOptions,
}: ProductOptionsProps) => {
  return (
    <fieldset>
      <legend className="text-xl font-semibold">{name}</legend>
      <div className="inline-flex item-center flex-wrap">
        {values.map((value) => {
          const id = `option-${name}-${value}`;
          const checked = selectedOptions[name] === value;

          return (
            <label key={id} htmlFor={id}>
              <input
                type="radio"
                className="sr-only"
                id={id}
                name={`option-${name}`}
                value={value}
                checked={checked}
                onChange={() => {
                  setOptions(name, value);
                }}
              />
              <div
                className={`p-2 text-lg rounded-full block cursor-pointer mr-3 ${
                  checked
                    ? "text-white bg-gray-900"
                    : "text-gray-900 bg-gray-200"
                }`}
              >
                <span className="px-2">{value}</span>
              </div>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
};

export default ProductOptions;
