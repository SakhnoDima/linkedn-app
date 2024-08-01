import { NextResponse } from "next/server";
import axios from 'axios';

export const POST = async (req, res) => {
    try {
        const { _id, userId, scannerName, autoBidding, searchWords, searchFilters } = await req.json();
        const response = await axios.post(
            'http://localhost:3001/upwork',
            {
                _id: _id,
                userId: userId,
                scannerName: scannerName,
                autoBidding: autoBidding,
                searchWords: searchWords,
                searchFilters: searchFilters
            },
        );

        console.log(response.data);

        return NextResponse.json(
            { message: response.data },
            { status: 200 }
        );
    } catch (error) {
        console.log("Error at API:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}