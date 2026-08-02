export async function GET() {
  return Response.json({
    ok: true,
    message: 'Endpoint funcionando',
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request) {
  const body = await request.json();

  return Response.json(
    {
      ok: true,
      received: body,
    },
    { status: 201 }
  );
}
