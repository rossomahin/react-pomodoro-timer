import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "../ui/card";

interface CardGenericProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  headerClassName?: string;
}

function CardGeneric({
  title,
  description,
  action,
  content,
  footer,
}: CardGenericProps) {
  return (
    <div className="max-w-75 sm:min-w-200 sm:max-w-200 flex justify-center items-center m-auto">
      <Card className="h-full w-full">
        <CardHeader className="flex justify-between items-center">
          <div>
            <CardTitle>
              <h1>{title}</h1>
            </CardTitle>
            {description && (
              <CardDescription>
                <h2>{description}</h2>
              </CardDescription>
            )}
          </div>
          {action && <div>{action}</div>}
        </CardHeader>
        <CardContent>
          {content && <div className="flex flex-col gap-4">{content}</div>}
        </CardContent>
        {footer && <div className="mt-4">{footer}</div>}
      </Card>
    </div>
  );
}

export default CardGeneric;
