"use client";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Skeleton,
} from "@mui/material";
import Image from "next/image";
import React, { memo } from "react";
import { useRouter } from "next/navigation";

const FacultyCard = ({ user }) => {
  const router = useRouter();
  return (
    <div
      className="relative w-full  "
      onClick={() => {
        if (user.role) {
          router.push(`/dashboard/${user.role}/${user.id}`);
        } else {
          router.push(`/dashboard/class/${user.id}`);
        }
      }}
    >
      <Card
        sx={{
          maxWidth: "full",
          margin: "0 auto",
          padding: "0.1em",
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="110"
            image="/faculty.jpg"
            alt="green iguana"
          />
          <CardContent>
            {user.name ? (
              <Typography gutterBottom variant="h5" component="div">
                {user.name}
              </Typography>
            ) : (
              <Skeleton variant="rectangular" width={"20%"} height={25} />
            )}
            {user.role ? (
              <>
                <Typography variant="body2" color="text.secondary">
                  {user.userId}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.course?.length != 0
                    ? user?.course?.map((item) => {
                        return <h2>{item.code}</h2>;
                      })
                    : "No course assigned yet"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user?.role=="faculty" ? (user.classes?.length != 0
                    ? user?.classes?.map((item) => {
                        return <h2>{item.name}</h2>;
                      })
                    : "No classes assigned yet") : (user.classes ? 
                         <h2>{user.classes.name}</h2>   : "No classes assigned yet")}
                </Typography>
              </>
            ) : (
              <></>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default memo(FacultyCard);
