<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $query = Notification::with('user');

        if ($user->role !== 'admin') {
            $query->where('user_id', $user->id);
        }

        return response()->json($query->latest('date_envoi')->get());
    }

    public function store(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'user_id'    => 'nullable|exists:users,id',
            'message'    => 'required|string',
            'type'       => 'required|string|max:255',
            'date_envoi' => 'nullable|date',
            'lu'         => 'boolean',
        ]);

        if ($user->role !== 'admin' || empty($validated['user_id'])) {
            $validated['user_id'] = $user->id;
        }

        $notification = Notification::create($validated);

        return response()->json($notification->load('user'), 201);
    }

    public function show(Request $request, Notification $notification)
    {
        $this->authorizeAccess($request, $notification);

        return response()->json($notification->load('user'));
    }

    public function update(Request $request, Notification $notification)
    {
        $this->authorizeAccess($request, $notification);

        $validated = $request->validate([
            'lu' => 'sometimes|boolean',
        ]);

        $notification->update($validated);

        return response()->json([
            'message' => 'Notification mise à jour',
            'notification' => $notification->load('user'),
        ]);
    }

    public function destroy(Request $request, Notification $notification)
    {
        $this->authorizeAccess($request, $notification);

        $notification->delete();

        return response()->json(['message' => 'Notification supprimée']);
    }

    private function authorizeAccess(Request $request, Notification $notification): void
    {
        $user = $request->user();

        if ($user->role !== 'admin' && $notification->user_id !== $user->id) {
            abort(403, "Vous n'êtes pas autorisé à accéder à cette notification.");
        }
    }
}
