import {NextResponse} from "next/server";
import Scanners from "@/app/lib/up-work-scanners";
import axios from "axios";
import {transformQuery} from "../../helpers";
import User from "@/app/lib/user-model";

export const GET = async (req, res) => {
    const {searchParams} = new URL(req.nextUrl);
    const taskId = searchParams.get("taskId");

    const scannerData = await Scanners.findOne({_id: taskId});

    if (!scannerData) {
        return NextResponse.json(
            {message: "Scanner did`nt find"},
            {status: 500}
        );
    }
    const user = await User.findById({_id: taskId.userId});

    try {
    // TODO Тут ми робимо запит на лямду який повторить пошук вакансій за попередній тиждень та поверне кількість
    //     await axios.post("https://6ejajjistb.execute-api.eu-north-1.amazonaws.com/default/lambda-create-task", {
    //             key: "upWork",
    //             taskType: "weekly-result",
    //             id: scannerData.userId,
    //             taskId: scannerData._id,
    //             userEmail: user.email,
    //             scannerName: scannerData.scannerName,
    //             autoBidding: scannerData.autoBidding,
    //             searchWords: transformQuery(
    //                 scannerData.searchWords.includeWords,
    //                 scannerData.searchWords.excludeWords
    //             ),
    //             searchFilters: {
    //                 ...scannerData.searchFilters,
    //                 category:
    //                     scannerData.searchFilters.category.length > 0
    //                         ? scannerData.searchFilters.category
    //                             .split(" | ")
    //                             .map((item) => item.trim())
    //                         : null,
    //                 clientLocation:
    //                     scannerData.searchFilters.clientLocation.length > 0
    //                         ? scannerData.searchFilters.clientLocation
    //                             .split(" | ")
    //                             .map((item) => item.trim())
    //                         : null,
    //             },
    //             clientParameters: scannerData.clientParameters,
    //             biddingOptions: scannerData.biddingOptions,
    //             coverLetterOptions: scannerData.biddingOptions,
    //         }
    //     ).then((createTaskResponse) => {
    //         const taskId = createTaskResponse.data.taskId;
    //         console.log("Task started with ID:", taskId);
    //         checkTaskStatus(taskId);
    //     });
        return NextResponse.json({message: "Ok"});
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500});
    }
};

async function checkTaskStatus(taskId) {
    let isAuth = false;

    const interval = setInterval(async () => {
        try {
            const statusResponse = await axios.post(
                "https://dim6czm31f.execute-api.eu-north-1.amazonaws.com/default/lambda-check-task-status",
                {
                    id: taskId,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (statusResponse.data.status === "completed") {
                console.log("Task completed:", statusResponse.data.result);
                const response = JSON.parse(statusResponse.data.result);
                console.log("Res in check status f", response);
                if (response.error) {
                    console.log("Error", response.error);
                    errorList.addError(taskId, response.error);
                    clearInterval(interval);
                }
                if (response.isUpWorkAuth) {
                    const newUser = await User.findByIdAndUpdate(
                        { _id: response.id },
                        {
                            isUpWorkAuth: true,
                        },
                        { new: true }
                    );
                    console.log(newUser);
                    isAuth = response.isUpWorkAuth;
                    clearInterval(interval);
                }
            } else {
                console.log("Task is still processing");
            }
        } catch (error) {
            console.error("Error checking task status:", error);
            isAuth = false; //!  перевірити!
        }
    }, 10000);

    while (true) {
        if (isAuth !== false) {
            break;
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    return isAuth;
}
