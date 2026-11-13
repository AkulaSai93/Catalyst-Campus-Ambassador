/* Backend hooks — the OTP and register calls are mocks; replace with real API calls. */

export type OtpChannel = "phone" | "email";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

// POST /otp/send { channel, value }
export async function sendOtp(_channel: OtpChannel, _value: string) {
  await wait(700);
  return { ok: true };
}

// POST /otp/verify { channel, value, code } — mock accepts any 6 digits except 000000
export async function verifyOtp(_channel: OtpChannel, _value: string, code: string) {
  await wait(600);
  return { ok: code !== "000000" };
}

// Public India Post API; city = district
export async function lookupPin(pin: string): Promise<{ city: string; state: string } | null> {
  const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
  const data = await res.json();
  const po = data?.[0]?.Status === "Success" && data[0].PostOffice?.[0];
  return po ? { city: po.District, state: po.State } : null;
}

export type Registration = {
  name: string;
  phone: string;
  email: string;
  pin: string;
  city: string;
  state: string;
  college: string;
  collegeListed: boolean;
};

// POST /ambassadors
export async function register(_payload: Registration) {
  await wait(900);
  return { ok: true };
}
