import { NextResponse } from 'next/server';
import linkedinFilters from '@/app/lib/linkedin-filters-model';
import dbConnect from '@/app/lib/moongose-connect';
import LinkedinFilters from "@/app/lib/linkedin-filters-model";

export const POST = async (req, res) => {
    const {values} = await req.json();
    console.log(values)
    await dbConnect();
    await LinkedinFilters.create({
        connections: values.connections,
        keyWords: values. keyWords,
        locations: values.locations,
        title: values.title,
        languages: values.languages,
        industries: values.industries,
        serviceCategories: values.serviceCategories,
    })
    return NextResponse.json({message: 'Add filters'})
}

export const GET = async () => {
    await dbConnect();
    const filters = await LinkedinFilters.findById('669113b233f91a3ad9ef7035');
    // console.log(filters)
    return NextResponse.json(filters);
}