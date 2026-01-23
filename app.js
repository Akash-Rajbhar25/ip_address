function validOctet(n) {
  return Number.isInteger(n) && n >= 0 && n <= 255;
}

function toIP(n) {
  return [
    (n >>> 24) & 255,
    (n >>> 16) & 255,
    (n >>> 8) & 255,
    n & 255
  ].join(".");
}

function toBin(n) {
  return [
    ((n >>> 24) & 255).toString(2).padStart(8, "0"),
    ((n >>> 16) & 255).toString(2).padStart(8, "0"),
    ((n >>> 8) & 255).toString(2).padStart(8, "0"),
    (n & 255).toString(2).padStart(8, "0")
  ].join(".");
}

function calc() {
  const out = document.getElementById("out");
  const detail = document.getElementById("detail");

  let input = document.getElementById("ip").value.trim();
  if (!input.includes("/")) input = input + "/16";

  const [ip, cidrStr] = input.split("/");
  const octets = ip.split(".").map(x => Number(x));
  const cidr = Number(cidrStr);

  if (octets.length !== 4 || octets.some(o => !validOctet(o))) {
    out.textContent = "Invalid IP. Octets must be 0–255.";
    detail.textContent = "";
    revealPanels();
    return;
  }

  if (!(cidr >= 0 && cidr <= 32)) {
    out.textContent = "Invalid CIDR.";
    detail.textContent = "";
    revealPanels();
    return;
  }

  const ipNum =
    (octets[0] << 24) |
    (octets[1] << 16) |
    (octets[2] << 8) |
    (octets[3]);

  const mask = cidr === 0 ? 0 : (0xFFFFFFFF << (32 - cidr)) >>> 0;
  const network = ipNum & mask;
  const broadcast = network | (~mask >>> 0);

  const hostCount = cidr < 31 ? (broadcast - network - 1) : 0;
  const firstHost = cidr < 31 ? network + 1 : network;
  const lastHost = cidr < 31 ? broadcast - 1 : broadcast;

  out.textContent =
    "Network Address:   " + toIP(network) + "\n" +
    "Broadcast Address: " + toIP(broadcast) + "\n" +
    "First Host:        " + toIP(firstHost) + "\n" +
    "Last Host:         " + toIP(lastHost) + "\n" +
    "Usable Hosts:      " + hostCount + "\n" +
    "Mask:              " + toIP(mask) + "\n";

  detail.textContent =
    "Given IP:              " + ip + "\n" +
    "IP (binary):           " + toBin(ipNum) + "\n\n" +
    "Mask /" + cidr + ":             " + toIP(mask) + "\n" +
    "Mask (binary):         " + toBin(mask) + "\n\n" +
    "Network Address:       " + toIP(network) + "\n" +
    "Network (binary):      " + toBin(network) + "\n\n" +
    "Broadcast Address:     " + toIP(broadcast) + "\n" +
    "Broadcast (binary):    " + toBin(broadcast) + "\n\n" +
    "Network bits:          " + cidr + "\n" +
    "Host bits:             " + (32 - cidr) + "\n" +
    "Max hosts:             2^" + (32 - cidr) + " - 2\n";

  revealPanels();
}

function revealPanels() {
  document.getElementById("panel-left").classList.add("show");
  document.getElementById("panel-right").classList.add("show");
}

function setTheme() {
  const t = document.getElementById("theme").value;
  document.body.className = "theme-" + t;
}

document.body.className = "theme-green";
