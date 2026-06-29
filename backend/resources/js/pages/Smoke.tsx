interface SmokeProps {
    message: string;
}

export default function Smoke({ message }: SmokeProps) {
    return <h1 data-testid="smoke">{message}</h1>;
}
