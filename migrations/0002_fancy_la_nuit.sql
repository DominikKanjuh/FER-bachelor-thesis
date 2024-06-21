ALTER TABLE "cvs" ALTER COLUMN "in_trash" SET DATA TYPE boolean;--> statement-breakpoint
ALTER TABLE "cvs" ALTER COLUMN "in_trash" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "cvs" ALTER COLUMN "in_trash" SET NOT NULL;