import dayJs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [{
   id: '1',
   deliveryDays: 7,
   priceCents: 0
}, {
  id: '2',
  deliveryDays: 3,
  priceCents: 499
}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;
  deliveryOptions.forEach((option) => {
    if(option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });
  return deliveryOption;
};

function isWeekend(date) {
  const daysOfWeek = date.format('dddd');
  return daysOfWeek === 'Saturday' || daysOfWeek === 'Sunday';
};

export function calculateDeliveryDate(deliveryOption) {
  let remainingDays = deliveryOption.deliveryDays;
  let deliveryDate = dayJs();

  while (remainingDays > 0) {
    deliveryDate = deliveryDate.add(1, "days");

    if(!isWeekend(deliveryDate)) {
      remainingDays--;
    }
  }
  return deliveryDate.format('dddd, MMMM D');
};

export function getCurrentDate() {
  return dayJs().format('MMMM D dddd');
}

