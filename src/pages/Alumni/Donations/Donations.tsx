import { Typography } from '@mui/material';

export const DonationsPage = () => (
    <div>
        <Typography variant="body2" color="text.secondary">
            In case if you want to support your University you can use bank
            requisites below to send money
        </Typography>
        <br />
        <Typography variant="body1">
            Наименование получателя платежа: Автономная некоммерческая
            организация высшего образования «Университет Иннополис»
        </Typography>
        <Typography variant="body1">
            Расчетный счет: 40703810062000000497
        </Typography>
        <Typography variant="body1">
            Наименование банка: ОТДЕЛЕНИЕ N8610 СБЕРБАНКА РОССИИ Г. КАЗАНЬ
        </Typography>
        <Typography variant="body1">БИК:049205603</Typography>
        <Typography variant="body1">
            Кор./счет получателя платежа: 30101810600000000603
        </Typography>
        <Typography variant="body1">
            ИНН получателя платежа: 1655258235
        </Typography>
        <Typography variant="body1">
            КПП получателя платежа: 161501001
        </Typography>
        <Typography variant="body1">
            Назначение платежа: Клуб выпускников
        </Typography>
        <br />
        <img
            style={{ height: 240, width: 240 }}
            alt="Payment QR"
            src="http://www.stqr.ru/qrcodes/QR-code_platiqr_22_Jul_2022_11-42-1.jpg"
        />
    </div>
);
