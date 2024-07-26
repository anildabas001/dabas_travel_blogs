export function validateEmail (email: string): boolean {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.toLowerCase());
}

export function dateFormat (dateTime: Date) {
    const date = new Date(dateTime);

    // Format the date
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return formattedDate;
}

export const getCookie = (name: string) => {  
  const value = `; ${document.cookie}`;
  const parts = value?.split(`; ${name}=`)|| [];
  console.log(document.cookie)
  if (parts?.length === 2) {
    return parts.pop()?.split(';').shift();
  };
};