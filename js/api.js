export async function fetchCards() {
  try {
    const res = await fetch('../data/cartas.json');
    if (!res.ok) throw new Error('Error al cargar datos');
    return await res.json();
  } catch (err) {
    console.warn(err);
    return [];
  }
}
