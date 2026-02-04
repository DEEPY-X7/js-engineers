import { NextResponse } from "next/server";

export async function POST() {
  try {
    const res = NextResponse.json({
      success: true,
      message: "Logged out successfully.",
    });

    // Delete cookie
    res.cookies.set("admin_token", "", {
      httpOnly: true,
      secure: true,
      expires: new Date(0), // expire immediately
      path: "/",
    });

    return res;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}