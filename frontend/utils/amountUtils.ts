export default function extractAmount(text: string) {
        const matchAmount = text.match(/\d+\.?\d{0,2}|\.\d{1,2}/);


        if (!matchAmount) {
            return null;
        }

        return matchAmount[0];
    }