export function failureResponse(message, status = 500) {
    return new Response(JSON.stringify({ error: message }), {
        ok: false,
        status: status,
        headers: { "Content-Type": "application/json" }
    });
}
export function successResponse(message, status = 200) {
    return new Response(JSON.stringify({ message: message }), {
        ok: true,
        status: status,
        headers: { "Content-Type": "application/json" }
    });
}
