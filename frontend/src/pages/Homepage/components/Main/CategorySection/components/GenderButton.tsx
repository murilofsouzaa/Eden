type Gender = 'female' | 'male';

type GenderButtonProps = {
    gender: Gender;
    onChangeGender: (gender: Gender) => void;
};

export function GenderButton({ gender, onChangeGender }: GenderButtonProps) {
    return(
        <div className="flex flex-col gap-4 m-2 sm:flex-row lg:ml-0">
            <button
                className={`btn ${gender === 'female' ? 'active' : ''}`}
                onClick={() => onChangeGender('female')}
            >
                Feminino
            </button>
            <button
                className={`btn ${gender === 'male' ? 'active' : ''}`}
                onClick={() => onChangeGender('male')}
            >
                Masculino
            </button>
        </div>
    )
}