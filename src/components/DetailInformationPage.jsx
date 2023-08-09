import React from 'react';
import { 
    MainContainer, DetailContainer, Header, InfoBox, StateBox, HistoryList, ButtonContainer, ReportContainer, DateInfo, HistoryContainer 
} from './DetailInformationPageStyles';

const DetailInformationPage = () => {
    // Expanded sample data (Replace with real data from API or database)
    const orderState = "Shipped";
    const historyItems = [
        { timestamp: '2023-08-01 10:00', description: 'Order created' },
        { timestamp: '2023-08-02 12:00', description: 'Payment received' },
        { timestamp: '2023-08-03 09:00', description: 'Order processed' },
        { timestamp: '2023-08-04 15:00', description: 'Packed for shipment' },
        { timestamp: '2023-08-05 11:00', description: 'Shipped via courier' },
        { timestamp: '2023-08-06 17:00', description: 'Out for delivery' },
        { timestamp: '2023-08-07 14:00', description: 'Delivered to the recipient' },
    ];
    const reportDates = ['2023-08-09', '2023-08-05'];


    const totalPrice = "$250.00";
    const paymentInformation = [
        { date: '2023-08-01', price: '$50.00', depositMethod: 'Credit Card', balance: '$200.00' },
        { date: '2023-08-02', price: '$50.00', depositMethod: 'Bank Transfer', balance: '$150.00' },
        { date: '2023-08-03', price: '$50.00', depositMethod: 'Credit Card', balance: '$100.00' },
        { date: '2023-08-04', price: '$50.00', depositMethod: 'Paypal', balance: '$50.00' },
        { date: '2023-08-05', price: '$50.00', depositMethod: 'Credit Card', balance: '$0.00' },
    ];

    const sortedPaymentInformation = paymentInformation.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
    });


    return (
        <MainContainer>
            <DetailContainer>
                <Header>Order Information</Header>
                <InfoBox>Your detailed order information goes here...</InfoBox>
                <StateBox>Order State: {orderState}</StateBox>
                
                <Header>Order History</Header>
                <HistoryContainer>
                    <HistoryList>
                        {historyItems.map((item, index) => (
                            <li key={index}><strong>{item.timestamp}:</strong> {item.description}</li>
                        ))}
                    </HistoryList>
                </HistoryContainer>
                <Header>Inquiry History</Header>
                <ButtonContainer>
                    <button>Direct</button>
                </ButtonContainer>
                
                <Header>Put Sample Data</Header>
                <ButtonContainer>
                    <button>Data Load</button>
                    <button>Get Data Form</button>
                </ButtonContainer>

                <Header>Report</Header>
                <ReportContainer>
                    {reportDates.map((date, index) => (
                        <div key={index}>
                            <button>Download Report</button>
                            <DateInfo>Created on: {date}</DateInfo>
                        </div>
                    ))}
                </ReportContainer>

                <Header>Payment</Header>
                <div>Total Price: {totalPrice}</div>
                <HistoryContainer>
                    <HistoryList>
                        {sortedPaymentInformation.map((payment, index) => (
                            <li key={index}>
                                <strong>Date:</strong> {payment.date}, 
                                <strong> Price:</strong> {payment.price}, 
                                <strong> Deposit Method:</strong> {payment.depositMethod}, 
                                <strong> Balance:</strong> {payment.balance}
                            </li>
                        ))}
                    </HistoryList>
                </HistoryContainer>
            </DetailContainer>
        </MainContainer>
    );
};

export default DetailInformationPage;
